/**
 * Created by lt on 2016/10/20.
 * 常用空间关系判断函数类
 * @ignore
 */
L.SpatialRelationship = {
  PixZone: 4,
  DBL_MAX: 1.7976931348623158e+308,
  //判断点是否在矩形范围之内
  hasContrainPoint: function(mRect, mPoint) {
    if (!mRect || !mPoint) return false;
    var rlt = false;
    rlt = mRect.containsPoint(mPoint);
    return rlt;
  },
  //判断点是否在线上
  IsPointNearLinesect: function(x1, y1, x2, y2, x, y, dZone) {
    var dAngle = Math.atan2((y2 - y1), (x2 - x1));
    var dx = x - x1;
    var dy = y - y1;
    var mPoint = new L.Point();
    this.RotatePoint(dx, dy, 0.0, 0.0, Math.cos(-dAngle), Math.sin(-dAngle), mPoint);
    dx = mPoint.x;
    dy = mPoint.y;
    if (this.IsInZone(dy, dZone)) {
      if (x >= (Math.min(x1, x2) - dZone) && x <= (Math.max(x1, x2) + dZone) && y >= (Math.min(y1, y2) - dZone) && y < (Math.max(y1, y2) + dZone))
        return true;
    }
    return false;
  },
  RotatePoint: function(x, y, xOrg, yOrg, dCosAngle, dSinAngle, mPoint) {
    //顺时针旋转
    var dx = x - xOrg;
    var dy = y - yOrg;
    x = dx * dCosAngle - dy * dSinAngle + xOrg;
    y = dx * dSinAngle + dy * dCosAngle + yOrg;
    mPoint.x = x;
    mPoint.y = y;
  },
  IsInZone: function(dValue, dZone) {
    return (this.IS0(Math.abs(dValue) - Math.abs(dZone)) || Math.abs(dValue) <= Math.abs(dZone))
  },
  IS0: function(i) {
    if (i > -1.0E-9 && i < 1.0E-9) {
      return true;
    } else {
      return false;
    }
  },
  IsPointInPolygon: function(pPoints, point) {
    if (!pPoints || pPoints.length == 0 || !point) return false;
    var counter = 0;
    var nCount = 0;
    nCount = pPoints.length;
    for (var i = 0; i < nCount; i++) {
      var p1 = new L.Point();
      p1.x = pPoints[i].x;
      p1.y = pPoints[i].y;
      var p2 = new L.Point();
      p2.x = pPoints[(i + 1) % nCount].x;
      p2.y = pPoints[(i + 1) % nCount].y;
      if (p1.y == p2.y) {
        continue;
      }
      if (point.y <= Math.min(p1.y, p2.y)) {
        continue;
      }
      if (point.y >= Math.max(p1.y, p2.y)) {
        continue;
      }
      var x = (point.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
      if (x > point.x) counter++;
    }

    return (counter % 2 > 0) ? true : false;
  },
  isPointInPoint: function(x1, y1, x2, y2, dMapZone) {
    var d = this.getDistance(x1, y1, x2, y2);
    var rlt = this.IsInZone(d, dMapZone);
    return rlt;
  },
  getDistance: function(x1, y1, x2, y2) {
    var d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  },
  //是否有捕捉值
  isSnapPoints: function(mArray, mSubCount, mSubPtCount, mSnapType, mSnapPoint, mMapZone, m_vRlt, m_vPointIndex) {
    if (mArray == null || mArray.length == 0 || mSubPtCount == null ||
      mSubPtCount.length == 0 || mSubCount == 0 || mSnapPoint == null || m_vRlt == null || m_vPointIndex == null)
      return false;
    var i = 0;
    var j = 0;
    var nCount = 0;
    var mP1 = null;
    var mP2 = null;
    var rlt = false;
    //var m_vRlt:Array=new Array();
    var nPointIndex = 0;
    if ((mSnapType & L.CSnapEnum.AFC_SNAP_POINT_ON_POINT) > 0) {
      nCount = mArray.length;
      for (i = 0; i < nCount; i++) {
        mP1 = mArray[i];
        if (mP1 == null) continue;
        rlt = this.isPointInPoint(mP1.x, mP1.y, mSnapPoint.x, mSnapPoint.y, mMapZone);
        if (rlt) {
          m_vRlt.push(mP1);
          m_vPointIndex.push(i);
          return true;
        }
      }
    }
    if ((mSnapType & L.CSnapEnum.AFC_SNAP_POINT_ON_LINE) > 0) {
      for (i = 0; i < mSubCount; i++) {
        nCount = mSubPtCount[i];
        for (j = 0; j < nCount - 1; j++) {
          mP1 = mArray[j + nPointIndex];
          mP2 = mArray[j + 1 + nPointIndex];
          if (mP1 == null || mP2 == null) continue;
          rlt = this.IsPointNearLinesect(mP1.x, mP1.y, mP2.x, mP2.y, mSnapPoint.x, mSnapPoint.y, mMapZone);
          if (rlt) {
            m_vRlt.push(mP1);
            m_vRlt.push(mP2);
            m_vPointIndex.push(j + nPointIndex);
            return true;
          }
        }
        nPointIndex += nCount;
      }
    }
    return false;
  },

  //求垂足
  pointProjectToLinesect: function(ptTest, pt1, pt2) {
    if (!ptTest || !pt1 || !pt2) return null;
    var dk = 0;
    var dk1 = 0;
    var dk2 = 0;
    if (pt1.x != ptTest.x)
      dk1 = (pt1.y - ptTest.y) / (pt1.x - ptTest.x);
    else
      dk1 = this.DBL_MAX;
    if (pt2.x != ptTest.x)
      dk2 = (pt2.y - ptTest.y) / (pt2.x - ptTest.x);
    else
      dk2 = this.DBL_MAX;
    if (pt2.y != pt1.y)
      dk = (pt2.x - pt1.x) / (pt1.y - pt2.y);
    else
      dk = this.DBL_MAX;
    var ptRet = new L.Point(0, 0);
    if (dk == this.DBL_MAX) {
      ptRet.x = ptTest.x;
      ptRet.y = pt1.y;
    } else if (dk == 0) {
      ptRet.x = pt1.x;
      ptRet.y = ptTest.y;
    } else {
      var dk2dk = dk * dk;
      ptRet.x = (dk * (pt1.y - ptTest.y) + dk2dk * ptTest.x + pt1.x) / (dk2dk + 1);
      ptRet.y = ptTest.y + dk * (ptRet.x - ptTest.x);
    }
    if (ptRet.x >= Math.min(pt1.x, pt2.x) && ptRet.x <= Math.max(pt2.x, pt1.x) &&
      ptRet.y >= Math.min(pt1.y, pt2.y) && ptRet.y <= Math.max(pt2.y, pt1.y)) {
      return ptRet;
    }
    if ((this.IS0(ptRet.x - pt1.x) && this.IS0(ptRet.x - pt1.x)) ||
      (this.IS0(ptRet.x - pt2.x) && this.IS0(ptRet.y - pt2.y))) {
      return ptRet;
    }
    return null;
  },

  //获取某个图元点串集合
  getGeometryPoints: function(mGeo) {
    if (mGeo == null) return null;
    var mArray = null;
    var mMapPoint = null;
    switch (mGeo.getType()) {
      case L.FeatureType.POINT:
        {
          mMapPoint = mGeo.mapPoint;
          if (mMapPoint != null) {
            mArray = new Array();
            mArray.push(mMapPoint);
          }
          break;
        }
      case L.FeatureType.MULTIPOINT:
        {
          mArray = mGeo.mapPoints;
          break;
        }
      case L.FeatureType.LINE:
        {
          mArray = mGeo.mapPoints;
          break;
        }
      case L.FeatureType.POLYGON:
        {
          mArray = mGeo.mapPoints;
          break;
        }
      case L.FeatureType.MULTIPOLYGON:
        {
          var polygons = mGeo.polygons;
          if (polygons && polygons.length > 0) {
            var len = polygons.length;
            for (var i = 0; i < len; i++) {
              if (mArray == null) mArray = new Array();
              mArray = mArray.concat(polygons[i].mapPoints);
            }
          }
          break;
        }
    }
    return mArray;
  },

  //获取坐标集合
  getPointsExt: function(m_vGeo) {
    if (m_vGeo == null || m_vGeo.length == 0) {
      return null;
    }
    var nCount = m_vGeo.length;
    var tmp = null;
    var mArray = new Array();
    for (var i = 0; i < nCount; i++) {
      var mGeo = m_vGeo[i];
      tmp = this.getGeometryPoints(mGeo);
      if (tmp != null && tmp.length > 0) {
        mArray = mArray.concat(tmp);
      }
    }

    if (mArray.length > 0) {
      return mArray;
    }
    return null;
  },

  //获取点串集合外包矩形
  getBound: function(mArray) {
    if (mArray == null || mArray.length == 0) {
      return null;
    }
    var mMin = new L.Point(0, 0);
    var mMax = new L.Point(0, 0);
    for (var i = 0; i < mArray.length; i++) {
      if (i == 0) {
        mMin.x = mArray[0].x;
        mMin.y = mArray[0].y;
        mMax.x = mArray[0].x;
        mMax.y = mArray[0].y;
        continue;
      }
      var tmp = mArray[i];
      if (mMin.x > tmp.x) {
        mMin.x = tmp.x;
      }
      if (mMin.y > tmp.y) {
        mMin.y = tmp.y;
      }
      if (mMax.x < tmp.x) {
        mMax.x = tmp.x;
      }
      if (mMax.y < tmp.y) {
        mMax.y = tmp.y;
      }
    }
    var mRect = new L.SeBounds();
    mRect.left = mMin.x;
    mRect.top = mMax.y;
    mRect.right = mMax.x;
    mRect.bottom = mMin.y;
    return mRect;
  },

  //获取某个图元拉伸之后的点串集合
  extrude: function(rcOld, rcNewBounds, pPts) {
    if (rcOld == null || rcOld.isNull() || rcNewBounds == null || pPts == null || pPts.length == 0) return pPts;
    var dXRatio = rcNewBounds.getWidth() / rcOld.getWidth();
    var dYRatio = rcNewBounds.getHeight() / rcOld.getHeight();

    var pntOrg1 = rcOld.getCenter();
    var pntOrg2 = rcNewBounds.getCenter();
    var nPointCount = pPts.length;
    var mArray = null;
    mArray = new Array();
    for (var i = 0; i < nPointCount; i++) {
      var tmp = new L.Point(0, 0);
      tmp.x = pntOrg2.x + (pPts[i].x - pntOrg1.x) * dXRatio;
      tmp.y = pntOrg2.y + (pPts[i].y - pntOrg1.y) * dYRatio;
      mArray.push(tmp);
    }
    if (mArray.length > 0) {
      return mArray;
    }
    return null;
  },

  //获取图元外包矩形
  getRectBound: function(m_vGeo) {
    var mArray = this.getPointsExt(m_vGeo);
    var mRect = this.getBound(mArray);
    return mRect;
  },

  //返回拉伸以后的图元集合
  resizeGeometrys: function(m_vOldGeo, rcNewBounds) {
    if (rcNewBounds == null || m_vOldGeo == null || m_vOldGeo.length == 0) return null;
    //if(rcNewBounds.isEmpty()) return m_vOldGeo;
    var m_vOldMapPoint = null;
    var m_vNewMapPoint = null;
    var mOldBounds = null;
    var m_vNewGeo = null;
    m_vNewGeo = new Array();
    var nCount = 0;
    var i = 0;
    var mGeoPoint = null;
    var mGeoLine = null;
    var mGeoRegion = null;
    switch (m_vOldGeo[0].getType()) {
      case L.FeatureType.POINT:
        {
          m_vOldMapPoint = this.getPointsExt(m_vOldGeo);
          mOldBounds = this.getBound(m_vOldMapPoint);
          nCount = m_vOldMapPoint.length;
          var tmp = null;
          for (i = 0; i < nCount; i++) {
            tmp = new Array();
            tmp[0] = m_vOldMapPoint[i];
            m_vNewMapPoint = this.extrude(mOldBounds, rcNewBounds, tmp);
            mGeoPoint = new L.SePointFeature(m_vNewMapPoint[0]);
            m_vNewGeo.push(mGeoPoint);
          }
          break;
        }
      case L.FeatureType.LINE:
        {
          mOldBounds = this.getRectBound(m_vOldGeo);
          nCount = m_vOldGeo.length;
          for (i = 0; i < nCount; i++) {
            tmp = m_vOldGeo[i].mapPoints;
            m_vNewMapPoint = this.extrude(mOldBounds, rcNewBounds, tmp);
            mGeoLine = new L.SePolylineFeature(m_vNewMapPoint, m_vOldGeo[i].polyCount, m_vOldGeo[i].subCount);
            m_vNewGeo.push(mGeoLine);
          }
          break;
        }
      case L.FeatureType.POLYGON:
      case L.FeatureType.MULTIPOLYGON:
        {
          mOldBounds = this.getRectBound(m_vOldGeo);
          nCount = m_vOldGeo.length;
          for (i = 0; i < nCount; i++) {
            switch (m_vOldGeo[i].getType()) {
              case L.FeatureType.POLYGON:
                {
                  tmp = m_vOldGeo[i].mapPoints;
                  m_vNewMapPoint = this.extrude(mOldBounds, rcNewBounds, tmp);
                  mGeoRegion = new L.SePolygonFeature(m_vNewMapPoint, m_vOldGeo[i].polyCount, m_vOldGeo[i].subCount);
                  m_vNewGeo.push(mGeoRegion);
                  break;
                }
              case L.FeatureType.MULTIPOLYGON:
                {
                  var polygons = m_vOldGeo[i].polygons;
                  if (!polygons || polygons.length == 0) break;

                  var len = polygons.length;
                  var newMulti = new L.SeMultiPolygonFeature();
                  newMulti.polygons = new Array();
                  for (var k = 0; k < len; k++) {
                    var region = polygons[k];
                    tmp = region.mapPoints;
                    m_vNewMapPoint = this.extrude(mOldBounds, rcNewBounds, tmp);
                    mGeoRegion = new L.SePolygonFeature(m_vNewMapPoint, region.polyCount, region.subCount);
                    newMulti.polygons.push(mGeoRegion);
                  }
                  m_vNewGeo.push(newMulti);
                  break;
                }
            }

          }
          break;
        }
    }
    if (m_vNewGeo != null && m_vNewGeo.length > 0) {
      return m_vNewGeo;
    }
    return null;
  },

  //返回旋转以后的坐标集合
  rotatePoint: function(_ptOrg, _dCosAngle, _dSinAngle, m_vOrgPoint) {
    if (m_vOrgPoint == null || m_vOrgPoint.length == 0 || _ptOrg == null) return null;
    var i = 0;
    var nCount = m_vOrgPoint.length;
    var m_vNewPoint = new Array();
    for (i = 0; i < nCount; i++) {
      var _pt = m_vOrgPoint[i];
      if (_pt == null) continue;
      var xx = _pt.x - _ptOrg.x;
      var yy = _pt.y - _ptOrg.y;
      var mNewPt = new L.Point(0, 0);
      mNewPt.x = xx * _dCosAngle - yy * _dSinAngle + _ptOrg.x;
      mNewPt.y = xx * _dSinAngle + yy * _dCosAngle + _ptOrg.y;
      m_vNewPoint.push(mNewPt);
    }
    if (m_vOrgPoint.length != m_vNewPoint.length) {
      console.log("rotatePoint-error");
    }
    if (m_vNewPoint.length > 0) {
      return m_vNewPoint;
    }
    return null;
  },
  /*****
   * 返回旋转以后的坐标
   * @param {Object} _ptOrg
   * @param {Object} _dCosAngle
   * @param {Object} _dSinAngle
   * @param {Object} orgPoint
   */
  rotatePoint2: function(_ptOrg, _dCosAngle, _dSinAngle, orgPoint) {
    if (orgPoint == null || orgPoint.length == 0 || _ptOrg == null) return null;
    var _pt = orgPoint;
    var xx = _pt.x - _ptOrg.x;
    var yy = _pt.y - _ptOrg.y;
    var mNewPt = new L.Point(0, 0);
    mNewPt.x = xx * _dCosAngle - yy * _dSinAngle + _ptOrg.x;
    mNewPt.y = xx * _dSinAngle + yy * _dCosAngle + _ptOrg.y;
    return mNewPt;
  },

  //旋转
  rotateGeometrys: function(m_vOldGeo, ptRtOrg, ptNew, ptOld) {
    if (m_vOldGeo == null || m_vOldGeo.length == 0) return null;
    if (ptRtOrg == null || ptNew == null || ptOld == null || ptNew.x == ptOld.x || ptNew.y == ptOld.y)
      return null;
    var dAngleOld = -Math.atan2(ptOld.y - ptRtOrg.y, ptOld.x - ptRtOrg.x);
    var dAngle = -dAngleOld - Math.atan2(ptNew.y - ptRtOrg.y, ptNew.x - ptRtOrg.x);
    var dCosAngle = Math.cos(-dAngle);
    var dSinAngle = Math.sin(-dAngle);
    var nAngleRadians = 0;
    var nCount = m_vOldGeo.length;
    var i = 0;
    var mGeo = null;
    mGeo = m_vOldGeo[0];
    //var dCosAngle:Number = Math.cos(nAngleRadians );
    //var dSinAngle:Number = Math.sin(nAngleRadians);// nAngle * Math.PI /1800.0
    var m_vOrgPoint = null;
    var m_vNewPoint = null;
    var pPpoint2DSwap_d = null;
    var pPolycountsSwap = null;
    var nSubCountSwap = 0;
    var m_vNewGeo = new Array();
    switch (mGeo.getType()) {
      case L.FeatureType.POINT:
      case L.FeatureType.MULTIPOINT:
        {
          var nLen = m_vOldGeo.length;
          for (var i = 0; i < nLen; i++) {
            var feature = m_vOldGeo[i];
            if (!feature) continue;
            var newFeature = feature.clone();
            if (newFeature && feature.getType() == L.FeatureType.POINT) {
              newFeature.mapPoint = this.rotatePoint2(ptRtOrg, dCosAngle, dSinAngle, feature.mapPoint);
              m_vNewGeo.push(newFeature);
            } else if (newFeature && feature.getType() == L.FeatureType.MULTIPOINT) {
              var nLen2 = feature.mapPoints ? feature.mapPoints.length : 0;
              newFeature.mapPoints = [];
              for (var j = 0; j < nLen2; j++) {
                newFeature.mapPoints.push(this.rotatePoint2(ptRtOrg, dCosAngle, dSinAngle, feature.mapPoints[j]));
              }
              m_vNewGeo.push(newFeature);
            }
          }
          break;
        }
      case L.FeatureType.LINE:
        {
          var mGeoLine = null;
          for (i = 0; i < nCount; i++) {
            mGeo = m_vOldGeo[i];
            if (mGeo == null) continue;
            m_vOrgPoint = mGeo.mapPoints;
            m_vNewPoint = this.rotatePoint(ptRtOrg, dCosAngle, dSinAngle, m_vOrgPoint);
            if (m_vNewPoint == null || m_vNewPoint.length == 0) continue;
            //mGeoLine = new L.SePolylineFeature(m_vNewPoint, mGeo.polyCount, mGeo.subCount, mGeo.id);
            mGeoLine = mGeo.clone();
            mGeoLine.mapPoints = m_vNewPoint;
            m_vNewGeo.push(mGeoLine);
          }
          break;
        }
      case L.FeatureType.POLYGON:
      case L.FeatureType.MULTIPOLYGON:
        {
          var mGeoRegion = null;
          for (i = 0; i < nCount; i++) {
            mGeo = m_vOldGeo[i];
            if (mGeo == null) continue;
            switch (mGeo.getType()) {
              case L.FeatureType.POLYGON:
                {
                  m_vOrgPoint = mGeo.mapPoints;
                  m_vNewPoint = this.rotatePoint(ptRtOrg, dCosAngle, dSinAngle, m_vOrgPoint);
                  if (m_vNewPoint == null || m_vNewPoint.length == 0) continue;
                  //mGeoRegion = new L.SePolygonFeature(m_vNewPoint, mGeo.polyCount, mGeo.subCount, mGeo.id);
                  mGeoRegion = mGeo.clone();
                  mGeoRegion.mapPoints = m_vNewPoint;
                  m_vNewGeo.push(mGeoRegion);
                  break;
                }
              case L.FeatureType.MULTIPOLYGON:
                {
                  var polygons = mGeo.polygons;
                  if (!polygons || polygons.length == 0) break;

                  var len = polygons.length;
                  //                var newMulti = new L.SeMultiPolygonFeature();
                  //                newMulti.polygons = new Array();
                  //                newMulti.id = mGeo.id;
                  var newMulti = mGeo.clone();
                  newMulti.polygons = [];
                  for (var k = 0; k < len; k++) {
                    var region = polygons[k];
                    m_vOrgPoint = region.mapPoints;
                    m_vNewPoint = this.rotatePoint(ptRtOrg, dCosAngle, dSinAngle, m_vOrgPoint);
                    if (m_vNewPoint == null || m_vNewPoint.length == 0) continue;
                    mGeoRegion = new L.SePolygonFeature(m_vNewPoint, region.polyCount, region.subCount);
                    newMulti.polygons.push(mGeoRegion);
                  }
                  m_vNewGeo.push(newMulti);
                  break;
                }
            }

          }
          break;
        }
    }
    if (m_vNewGeo.length > 0) {
      return m_vNewGeo;
    }
    return null;
  },

  //返回移动之后的点串集合
  remove: function(pt, m_vOrgPoint) {
    if (m_vOrgPoint == null || m_vOrgPoint.length == 0 || pt == null) return null;
    var m_vNewPoint = new Array();
    var nCount = m_vOrgPoint.length;
    var i = 0;
    for (i = 0; i < nCount; i++) {
      var mOldPoint = m_vOrgPoint[i];
      var mNewPoint = new L.Point(0, 0);
      mNewPoint.x = mOldPoint.x + pt.x;
      mNewPoint.y = mOldPoint.y + pt.y;
      m_vNewPoint.push(mNewPoint);
    }
    if (m_vNewPoint.length > 0) {
      return m_vNewPoint;
    }
    return null;
  },
  remove2: function(pt, mOldPoint) {
    if (mOldPoint == null || pt == null) return null;
    var mNewPoint = new L.Point(0, 0);
    mNewPoint.x = mOldPoint.x + pt.x;
    mNewPoint.y = mOldPoint.y + pt.y;
    return mNewPoint;
  },

  //移动图元
  removeGeometrys: function(m_vOldGeo, pt) {
    if (m_vOldGeo == null || m_vOldGeo.length == 0) return null;
    var nCount = m_vOldGeo.length;
    var i = 0;
    var mGeo = null;
    mGeo = m_vOldGeo[0];
    var m_vOrgPoint = null;
    var m_vNewPoint = null;
    var pPpoint2DSwap_d = null;
    var pPolycountsSwap = null;
    var nSubCountSwap = 0;
    var m_vNewGeo = new Array();
    switch (mGeo.getType()) {
      case L.FeatureType.POINT: //单点
      case L.FeatureType.MULTIPOINT: //多点
        {
          var nLen = m_vOldGeo.length;
          for (var i = 0; i < nLen; i++) {
            var feature = m_vOldGeo[i];
            if (!feature) continue;
            var newFeature = feature.clone();
            if (newFeature && feature.getType() == L.FeatureType.POINT) {
              newFeature.mapPoint = this.remove2(pt, newFeature.mapPoint);
              m_vNewGeo.push(newFeature);
            } else if (newFeature && feature.getType() == L.FeatureType.MULTIPOINT) {
              var nLen2 = feature.mapPoints ? feature.mapPoints.length : 0;
              newFeature.mapPoints = [];
              for (var j = 0; j < nLen2; j++) {
                newFeature.mapPoints.push(this.remove2(pt, feature.mapPoints[j]));
              }
              m_vNewGeo.push(newFeature);
            }
          }
          break;
        }
      case L.FeatureType.LINE:
        {
          var mGeoLine = null;
          for (i = 0; i < nCount; i++) {
            mGeo = m_vOldGeo[i];
            if (mGeo == null) continue;
            m_vOrgPoint = mGeo.mapPoints;
            m_vNewPoint = this.remove(pt, m_vOrgPoint);
            if (m_vNewPoint == null || m_vNewPoint.length == 0) continue;
            mGeoLine = new L.SePolylineFeature(m_vNewPoint, mGeo.polyCount, mGeo.subCount, mGeo.id);
            mGeoLine.projInfo = mGeo.projInfo;
            mGeoLine.proj = mGeo.proj;
            m_vNewGeo.push(mGeoLine);
          }
          break;
        }
      case L.FeatureType.POLYGON:
      case L.FeatureType.MULTIPOLYGON:
        {
          var mGeoRegion = null;
          for (i = 0; i < nCount; i++) {
            mGeo = m_vOldGeo[i];
            if (mGeo == null) continue;
            m_vNewPoint = null;
            switch (mGeo.getType()) {
              case L.FeatureType.POLYGON:
                {
                  m_vOrgPoint = mGeo.mapPoints;
                  m_vNewPoint = this.remove(pt, m_vOrgPoint);
                  if (m_vNewPoint == null || m_vNewPoint.length == 0) continue;
                  mGeoRegion = new L.SePolygonFeature(m_vNewPoint, mGeo.polyCount, mGeo.subCount, mGeo.id);
                  mGeoRegion.projInfo = mGeo.projInfo;
                  mGeoRegion.proj = mGeo.proj;
                  m_vNewGeo.push(mGeoRegion);
                  break;
                }
              case L.FeatureType.MULTIPOLYGON:
                {
                  var polygons = mGeo.polygons;
                  if (!polygons || polygons.length == 0) break;

                  var len = polygons.length;
                  var newMulti = new L.SeMultiPolygonFeature();
                  newMulti.polygons = new Array();
                  for (var k = 0; k < len; k++) {
                    var region = polygons[k];
                    m_vOrgPoint = region.mapPoints;
                    m_vNewPoint = this.remove(pt, m_vOrgPoint);
                    if (m_vNewPoint == null || m_vNewPoint.length == 0) continue;
                    mGeoRegion = new L.SePolygonFeature(m_vNewPoint, region.polyCount, region.subCount);
                    newMulti.polygons.push(mGeoRegion);
                  }
                  newMulti.id = mGeo.id;
                  newMulti.projInfo = mGeo.projInfo;
                  newMulti.proj = mGeo.proj;
                  m_vNewGeo.push(newMulti);
                  break;
                }
            }
          }
          break;
        }
    }
    if (m_vNewGeo.length > 0) {
      return m_vNewGeo;
    }
    return null;
  },

  //获取像素容限对应的地图容限
  getTolerance: function() {
    var p1 = new L.Point(0, 0);
    var p2 = new L.Point(0, 0);
    p2.x = this.PixZone;
    var m1 = L.SeWorkSpace.instance().pixelToMap(p1);
    var m2 = L.SeWorkSpace.instance().pixelToMap(p2);
    if (m1 == null || m2 == null) return 0;
    var dLen = this.getDistance(m1.x, m2.y, m2.x, m2.y);
    return dLen;
  },

  //获取 mIndex在哪个区间里
  getChildIndex: function(mSubCount, mPtsCount, mIndex) {
    if (mPtsCount == null || mPtsCount.length == 0 || mSubCount <= 0) return -1;
    var _nIndex = 0;
    for (var i = 0; i < mSubCount; i++) {
      var nCount = mPtsCount[i];
      _nIndex += nCount;
      if (_nIndex > mIndex) {
        return i;
      }
    }
    return -1;
  },

  //在每个子对象里是否为起点，true表示是
  isStart: function(mSubIndex, mSubCount, mPtsCount, mIndex) {
    if (mPtsCount == null || mPtsCount.length == 0 || mSubCount <= 0 || mSubIndex < 0) return false;
    var nCount = 0;
    for (var i = 0; i < mSubIndex; i++) {
      nCount += mPtsCount[i];
    }
    if (nCount > 0) {
      nCount = nCount;
    }
    mIndex -= nCount;
    if (mIndex == 0) return true;
    return false;
  },
  /***
   * 求质心
   * @param {Object} _pPoints
   * @param {Object} _pPolyPtsCount
   * @param {Object} _nPolyCount
   * @param {Object} _rcBound
   * @param {Object} _InnerPoint
   */
  innerPointExt: function(_pPoints, _pPolyPtsCount, _nPolyCount, _rcBound, _InnerPoint) {
    {
      var nPtCount = 0;
      for (var i = 0; i < _nPolyCount; i++) {
        if (_pPolyPtsCount[i] > 2)
          nPtCount += _pPolyPtsCount[i];
      }
      if (nPtCount < 3)
        return false;
    }

    var I, CrossNum, TotalPoints;
    var X1, Y1, X2, Y2;
    var X3, Y3, X4, Y4;
    var Dist, MaxLength;
    var MaxSegmentNo;
    var Sign1 = 0,
      Sign2 = 0,
      NewSign1, NewSign2;
    var bAddRepPoint;
    var Result = false;
    var n = 0;
    var m = 0;
    var lPointCount = 0;
    var YMax;
    var YMin;
    var PolyCountsMax = _pPolyPtsCount[0];
    var Flag = 0;
    for (n = 0; n < _nPolyCount; n++) {
      if (PolyCountsMax <= _pPolyPtsCount[n]) {
        PolyCountsMax = _pPolyPtsCount[n];
        Flag = n;
      }
    }
    for (n = 0; n < Flag; n++)
      lPointCount += _pPolyPtsCount[n];
    YMax = _pPoints[lPointCount].y;
    YMin = _pPoints[lPointCount].y;
    for (m = 0; m < _pPolyPtsCount[Flag]; m++) {
      if (YMax <= _pPoints[lPointCount + m].y) {
        YMax = _pPoints[lPointCount + m].y;
      }
      if (YMin >= _pPoints[lPointCount + m].y) {
        YMin = _pPoints[lPointCount + m].y;
      }
    }
    Y1 = (YMax + YMin) / 2;
    Y2 = Y1;
    X1 = _rcBound.left - Math.abs(_rcBound.right - _rcBound.left);
    X2 = _rcBound.right + Math.abs(_rcBound.right - _rcBound.left);
    var pntResult = new L.Point(0, 0);
    TotalPoints = 0;
    CrossNum = 0;
    var pSPointX = [0];
    var nLen = 1;
    var Y0 = 0;
    for (var N = 0; N <= _nPolyCount - 1; N++) {
      var CrossOfN = 0;
      for (var J = 1; J <= _pPolyPtsCount[N]; J++) {
        if (J == _pPolyPtsCount[N]) {
          X3 = _pPoints[TotalPoints + J - 1].x;
          Y3 = _pPoints[TotalPoints + J - 1].y;
          X4 = _pPoints[TotalPoints].x;
          Y4 = _pPoints[TotalPoints].y;
        } else {
          X3 = _pPoints[TotalPoints + J - 1].x;
          Y3 = _pPoints[TotalPoints + J - 1].y;
          X4 = _pPoints[TotalPoints + J].x;
          Y4 = _pPoints[TotalPoints + J].y;
        }
        if (Y4 != Y3) {
          bAddRepPoint = true;
          if ((J >= 2) && (J < Math.abs(_pPolyPtsCount[N]) - 1)) {
            NewSign1 = (_pPoints[TotalPoints + J - 2].y - _pPoints[TotalPoints + J - 1].y);
            if (NewSign1 != 0) Sign1 = NewSign1;
            NewSign2 = (_pPoints[TotalPoints + J].y - _pPoints[TotalPoints + J - 1].y);
            if (NewSign2 != 0) Sign2 = NewSign2;
            if (Y3 == Y1) {
              bAddRepPoint = ((Sign1 * Sign2) >= 0);
            }
          } else {
            NewSign1 = (_pPoints[TotalPoints + (Math.abs(_pPolyPtsCount[N]) - 1) - 1].y - _pPoints[TotalPoints + 0].y);
            if (NewSign1 != 0) Sign1 = NewSign1;
            NewSign2 = (_pPoints[TotalPoints + 1].y - _pPoints[TotalPoints + 0].y);
            if (NewSign2 != 0) Sign2 = NewSign2;
            if (Y4 == Y1) {
              bAddRepPoint = ((Sign1 * Sign2) >= 0);
            }
          }
        } else {
          bAddRepPoint = false;
        }
        if ((bAddRepPoint) && (L.SpatialRelationship.intersectLineSect(new L.Point(X1, Y1), new L.Point(X2, Y2), new L.Point(X3, Y3), new L.Point(X4, Y4), pntResult))) {
          nLen = (CrossNum + 1);
          var len = pSPointX.length;
          var nCount = nLen - len;
          for (var r = 0; r < nCount; r++) {
            pSPointX.push(0);
          }
          pSPointX[CrossNum] = pntResult.x;
          CrossOfN++;
          CrossNum++;
          if (CrossOfN > 1) {
            if (pSPointX[CrossNum - 1] == pSPointX[CrossNum - 2]) {
              if ((Y0 - Y3) * (Y4 - Y3) < 0) {
                CrossNum--;
                CrossOfN--;
              }
            }
          }
          Y0 = Y3;
        }
      }
      if (pSPointX[CrossNum - 1] == pSPointX[0]) {
        Y0 = _pPoints[TotalPoints + 1].y;
        Y3 = _pPoints[TotalPoints].y;
        Y4 = _pPoints[TotalPoints + _pPolyPtsCount[N] - 1].y;
        if ((Y0 - Y3) * (Y4 - Y3) < 0) CrossNum--;
      }
      TotalPoints = TotalPoints + Math.abs(_pPolyPtsCount[N]);
    }
    if ( /*((CrossNum % 2) == 0) && */ (CrossNum >= 2)) {
      pSPointX.sort();
      //            std::sort(pSPointX,pSPointX+CrossNum);
      MaxLength = 0 //2.2250738585072014e-308;
      MaxSegmentNo = -1;
      for (I = 0; I <= (CrossNum / 2 - 1); I++) {
        Dist = pSPointX[2 * I + 1] - pSPointX[2 * I];
        if (Dist > MaxLength) {
          MaxLength = Dist;
          MaxSegmentNo = I;
        }
      }
      var nIdx1 = 2 * MaxSegmentNo + 1;
      var nIdx2 = 2 * MaxSegmentNo;
      if (nIdx1 < nLen && nIdx2 < nLen) {
        _InnerPoint.x = (pSPointX[nIdx1] + pSPointX[nIdx2]) / 2;
        _InnerPoint.y = Y1;
        Result = true;
      } else {
        Result = false;
      }
    }
    pSPointX = [];
    return Result;
  },

  intersectLineSect: function(ptStart1, ptEnd1, ptStart2, ptEnd2, ptResult) {
    if ((ptStart1.x == ptEnd1.x && ptStart1.y == ptEnd1.y) || (ptStart2.x == ptEnd2.x && ptStart2.y == ptEnd2.y))
      return false;

    var dOffsetX1 = ptEnd1.x - ptStart1.x;
    var dOffsetY1 = ptEnd1.y - ptStart1.y;
    var dOffsetX2 = ptEnd2.x - ptStart2.x;
    var dOffsetY2 = ptEnd2.y - ptStart2.y;
    var dOffsetX12 = ptStart1.x - ptStart2.x;
    var dOffsetY12 = ptStart1.y - ptStart2.y;
    var dDelta = dOffsetX1 * dOffsetY2 - dOffsetX2 * dOffsetY1;
    var dSlopeDelta = dDelta;
    if (dOffsetX1 != 0 && dOffsetX2 != 0) {
      dSlopeDelta /= (dOffsetX1 * dOffsetX2); //б
    }
    if (dSlopeDelta >= -1.0e-10 && dSlopeDelta <= 1.0e-10) //
    {
      if (ptStart1 == ptStart2) {
        ptResult.x = ptStart1.x;
        ptResult.y = ptStart1.y;
        return true;
      }
      if (ptStart1 == ptEnd2) {
        ptResult.x = ptStart1.x;
        ptResult.y = ptStart1.y;
        return true;
      }
      if (ptEnd1 == ptStart2) {
        ptResult.x = ptEnd1.x;
        ptResult.y = ptEnd1.y;
        return true;
      }
      if (ptEnd1 == ptEnd2) {
        ptResult.x = ptEnd1.x;
        ptResult.y = ptEnd1.y;
        return true;
      }
      return false; //
    }
    var a1 = (dOffsetX1 * dOffsetY12 - dOffsetY1 * dOffsetX12) / dDelta;
    var a2 = (dOffsetX2 * dOffsetY12 - dOffsetY2 * dOffsetX12) / dDelta;
    if (a1 <= -1.0e-10 || a1 >= 1.0 + 1.0e-10 || a2 <= -1.0e-10 || a2 >= 1.0 + 1.0e-10) //
    {
      return false;
    }
    ptResult.x = a1 * dOffsetX2 + ptStart2.x;
    ptResult.y = a1 * dOffsetY2 + ptStart2.y;
    return true;
  },
  /***
   * 圆转面
   * @param vPts
   * @param ptCenter
   * @param dPriAxis
   * @param dSecAxis
   * @param dRotation
   * @param dStartAng
   * @param dEndAng
   * @param nPtCount
   * @returns {boolean}
   * @constructor
   */
  ConvArc2PLine: function(vPts, ptCenter, dPriAxis, dSecAxis, dRotation, dStartAng, dEndAng, nPtCount) {
    if (!vPts || !ptCenter || !dPriAxis || !dSecAxis) return false;
    var nCount = nPtCount ? nPtCount : Math.abs(dEndAng - dStartAng) * 45.0 / Math.PI;
    var dStep = (dEndAng - dStartAng) / (nCount - 1);
    var i = 0;
    for (i = 0; i < nCount - 1; i++) {
      var point = new L.Point(0, 0);
      point.x = ptCenter.x + dPriAxis * Math.cos(dStartAng);
      point.y = ptCenter.y + dSecAxis * Math.sin(dStartAng);
      vPts.push(point);
      dStartAng += dStep;
    }
    if (nCount > 0) {
      var point = new L.Point(0, 0);
      point.x = ptCenter.x + dPriAxis * Math.cos(dEndAng);
      point.y = ptCenter.y + dSecAxis * Math.sin(dEndAng);
      vPts.push(point);
    }
    if (!L.SpatialRelationship.IS0(dRotation)) {
      var dCos = Math.cos(dRotation);
      var dSin = Math.sin(dRotation);
      for (var i = 0; i < vPts.length; i++) {
        L.SpatialRelationship.RotatePoint(vPts[i].x, vPts[i].y, ptCenter.x, ptCenter.y, dCos, dSin, vPts[i]);
      }
    }
  },
  /****
   * 判断坐标点是否在同一条直线上
   * @param {Object} points [{Point}]
   * @return {Boolean} true表示在同一条直线上
   */
  isSameSlope: function(points) {
    if (!points) return false;
    var bRet = false;
    var nCount = points.length;
    if (nCount > 1) {
      var arrayUnique = function(array) {
        if (array && array.length > 0) {
          var temp = new Array();
          array.sort();
          var nlen = array.length;
          for (var i = 0; i < nlen; i++) {
            if (array[i] == array[i + 1]) {
              continue;
            }
            temp[temp.length] = array[i];
          }
          return temp;
        }
        return null;
      };
      var list = points.map(function(obj) {
        return obj.x;
      });
      list = arrayUnique(list);
      if (!list || list.length == 1) {
        return false;
      }
      var k = (points[1].y - points[0].y) / (points[1].x - points[0].x);
      var i = 0;
      for (i = 2; i < nCount; i++) {
        var ki = (points[i].y - points[i - 1].y) / (points[i].x - points[i].x);
        if (!this.IS0(ki - k)) {
          break;
        }
      }
      if (i >= nCount) {
        bRet = true;
      }
    }
    return bRet;
  },

  /****
   * 生成Point数组
   * @param {Object} vP0 Point,顶点
   * @param {Number} num Number,个数
   * @return{Array} Array数组 [{Point}]
   */
  createCurve: function(points, num) {
    // 除首尾除外，其它是控制点
    if (points && points.length > 1) {
      // t的增量， 可以通过setp大小确定需要保存的曲线上点的个数  
      var array = [];
      num = num || 10;
      num = num * (points.length - 1);
      var step = 1 / num;
      for (var t = 0.0; t <= 1.0; t += step) {
        var point = this.calCurvePoint(t, points);
        array.push(point);
      }
      return array;
    } else {
      return points;
    }
  },
  calCurvePoint: function(t, m_vecCtrlPt) {
    // 除首尾除外，其它是控制点
    var point = null;
    if (m_vecCtrlPt && m_vecCtrlPt.length > 0) {
      var nLen = m_vecCtrlPt.length;
      var m = nLen - 1;
      var x = 0;
      var y = 0;
      for (var i = 0; i < nLen; i++) {
        if (i == 0) {
          x += (m_vecCtrlPt[i].x) * Math.pow(1 - t, nLen - 1);
          y += (m_vecCtrlPt[i].y) * Math.pow(1 - t, nLen - 1);
        } else if (i == nLen - 1) {
          x += (m_vecCtrlPt[i].x) * Math.pow(t, i);
          y += (m_vecCtrlPt[i].y) * Math.pow(t, i);
        } else {
          x += m * (m_vecCtrlPt[i].x) * Math.pow(t, i) * Math.pow((1 - t), nLen - 1 - i);
          y += m * (m_vecCtrlPt[i].y) * Math.pow(t, i) * Math.pow((1 - t), nLen - 1 - i);
        }

      }
      point = new L.Point(x, y);
      console.log(point);
    }
    return point;
  },
  /**
   * Calculates an array containing points representing a cardinal spline through given point array.
   * Points must be arranged as: [x1, y1, x2, y2, ..., xn, yn].
   *
   * There must be a minimum of two points in the input array but the function
   * is only useful where there are three points or more.
   *
   * The points for the cardinal spline are returned as a new array.
   *
   * @param {Array} points - point array
   * @param {Number} [tension=0.5] - tension. Typically between [0.0, 1.0] but can be exceeded
   * @param {Number} [numOfSeg=25] - number of segments between two points (line resolution)
   * @param {Boolean} [close=false] - Close the ends making the line continuous
   * @returns {Float32Array} New array with the calculated points that was added to the path
   */
  getCurvePoints: function(points, tension, numOfSeg, close) {
    if (typeof points === "undefined" || points.length < 2) return new Float32Array(0);

    // options or defaults
    tension = typeof tension === "number" ? tension : 0.5;
    numOfSeg = typeof numOfSeg === "number" ? numOfSeg : 25;

    var pts, // for cloning point array
      i = 1,
      l = points.length,
      rPos = 0,
      rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0),
      res = new Float32Array(rLen),
      cache = new Float32Array((numOfSeg + 2) << 2),
      cachePtr = 4;

    pts = points.slice(0);

    if (close) {
      pts.unshift(points[l - 1]); // insert end point as first point
      pts.unshift(points[l - 2]);
      pts.push(points[0], points[1]); // first point as last point
    } else {
      pts.unshift(points[1]); // copy 1. point and insert at beginning
      pts.unshift(points[0]);
      pts.push(points[l - 2], points[l - 1]); // duplicate end-points
    }

    // cache inner-loop calculations as they are based on t alone
    cache[0] = 1; // 1,0,0,0

    for (; i < numOfSeg; i++) {

      var st = i / numOfSeg,
        st2 = st * st,
        st3 = st2 * st,
        st23 = st3 * 2,
        st32 = st2 * 3;

      cache[cachePtr++] = st23 - st32 + 1; // c1
      cache[cachePtr++] = st32 - st23; // c2
      cache[cachePtr++] = st3 - 2 * st2 + st; // c3
      cache[cachePtr++] = st3 - st2; // c4
    }

    cache[++cachePtr] = 1; // 0,1,0,0

    // calc. points
    parse(pts, cache, l, tension);

    if (close) {
      //l = points.length;
      pts = [];
      pts.push(points[l - 4], points[l - 3],
        points[l - 2], points[l - 1], // second last and last
        points[0], points[1],
        points[2], points[3]); // first and second
      parse(pts, cache, 4, tension);
    }

    function parse(pts, cache, l, tension) {

      for (var i = 2, t; i < l; i += 2) {

        var pt1 = pts[i],
          pt2 = pts[i + 1],
          pt3 = pts[i + 2],
          pt4 = pts[i + 3],

          t1x = (pt3 - pts[i - 2]) * tension,
          t1y = (pt4 - pts[i - 1]) * tension,
          t2x = (pts[i + 4] - pt1) * tension,
          t2y = (pts[i + 5] - pt2) * tension,
          c = 0,
          c1, c2, c3, c4;

        for (t = 0; t < numOfSeg; t++) {

          c1 = cache[c++];
          c2 = cache[c++];
          c3 = cache[c++];
          c4 = cache[c++];

          res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x;
          res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y;
        }
      }
    }

    // add last point
    l = close ? 0 : points.length - 2;
    res[rPos++] = points[l++];
    res[rPos] = points[l];
    return res;
  }
}
