OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

//var featureserver = "http://localhost:8080/"
var featureserver = "http://featureserver.org/fs"


OpenLayers.Util.extend(OpenLayers.Request,{
                       makeSameOrigin : function(url, proxy) {
                       return proxy + encodeURIComponent(url);
                       }
                       });


var DeleteFeature = OpenLayers.Class(OpenLayers.Control.SelectFeature, {
                                     clickFeature: function(feature) {
                                     if(feature.fid == undefined) {
                                     feature.layer.destroyFeatures([feature]);
                                     } else {
                                     feature.state = OpenLayers.State.DELETE;
                                     feature.layer.events.triggerEvent("afterfeaturemodified",
                                                                    {feature: feature});
                                     feature.renderIntent = "select";
                                     feature.layer.drawFeature(feature);
                                     }
                                     },
                                     clickoutFeature: function(feature) {},
                                     unselectAll: function(options) {
                                     },
                                     toggleSelect: function() {},
                                     overFeature: function(feature) {
                                     var layer = feature.layer;
                                     if(feature.state != OpenLayers.State.DELETE) {
                                     return OpenLayers.Control.SelectFeature.prototype.overFeature.apply(this, arguments);
                                     }
                                     },
                                     outFeature : function(feature) {
                                     if(feature.state != OpenLayers.State.DELETE) {
                                     return OpenLayers.Control.SelectFeature.prototype.outFeature.apply(this, arguments);
                                     }
                                     },
                                     CLASS_NAME: "OpenLayers.Control.DeleteFeature"
                                     });




var map = new OpenLayers.Map('map-canvas', {
                             units : 'm',
                             projection: new OpenLayers.Projection("EPSG:4326"),
                             displayProjection: new OpenLayers.Projection("EPSG:4326")
                             });

map.addLayer(new OpenLayers.Layer.OSM("OpenStreetMap"));

var savePoint = new OpenLayers.Strategy.Save();
var wfstPoint = new OpenLayers.Layer.Vector("Editable Points", {
                                            strategies: [new OpenLayers.Strategy.BBOX(), savePoint],
                                            projection: new OpenLayers.Projection("EPSG:4326"),
                                            protocol: new OpenLayers.Protocol.WFS({
                                                                                  version: "1.1.0",
                                                                                  srsName: "EPSG:4326",
                                                                                  url: featureserver + "?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=fs_point",
                                                                                  //featurePrefix: "fs",
                                                                                  featureType: "fs_point",
                                                                                  featureNS :  "http://example.com/featureserver",
                                                                                  geometryName: "geometry"
                                                                                  //schema: featureserver + "?SERVICE=WFS&REQUEST=DescribeFeatureType?VERSION=1.1.0&TYPENAME=fs_point"
                                                                                  })
                                            });
wfstPoint.id = "point";
map.addLayer(wfstPoint);

var saveLine = new OpenLayers.Strategy.Save();
var wfstLine = new OpenLayers.Layer.Vector("Editable Lines", {
                                           strategies: [new OpenLayers.Strategy.BBOX(), saveLine],
                                           projection: new OpenLayers.Projection("EPSG:4326"),
                                           protocol: new OpenLayers.Protocol.WFS({
                                                                                 version: "1.1.0",
                                                                                 srsName: "EPSG:4326",
                                                                                 url: featureserver + "?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=fs_line",
                                                                                 //featurePrefix: "fs",
                                                                                 featureType: "fs_line",
                                                                                 featureNS :  "http://example.com/featureserver",
                                                                                 geometryName: "geometry"
                                                                                 //schema: featureserver + "?SERVICE=WFS&REQUEST=DescribeFeatureType?VERSION=1.1.0&TYPENAME=fs_line"
                                                                                 })
                                           });
wfstLine.id = "line";
map.addLayer(wfstLine);

var savePolygon = new OpenLayers.Strategy.Save();
var wfstPolygon= new OpenLayers.Layer.Vector("Editable Polygons", {
                                             strategies: [new OpenLayers.Strategy.BBOX(), savePolygon],
                                             projection: new OpenLayers.Projection("EPSG:4326"),
                                             protocol: new OpenLayers.Protocol.WFS({
                                                                                   version: "1.1.0",
                                                                                   srsName: "EPSG:4326",
                                                                                   url: featureserver + "?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=fs_polygon",
                                                                                   //featurePrefix: "fs",
                                                                                   featureNS :  "http://example.com/featureserver",
                                                                                   featureType: "fs_polygon",
                                                                                   geometryName: "geometry"
                                                                                   //schema: featureserver + "?SERVICE=WFS&REQUEST=DescribeFeatureType?VERSION=1.1.0&TYPENAME=fs_polygon"
                                                                                   })
                                             });
wfstPolygon.id = "polygon";
map.addLayer(wfstPolygon);


var panel = new OpenLayers.Control.Panel({
                                         displayClass: 'customEditingToolbar',
                                         allowDepress: true
                                         });

var point = new OpenLayers.Control.DrawFeature(
                                               wfstPoint, OpenLayers.Handler.Point,
                                               {
                                               title: "Draw Point",
                                               displayClass: "olControlDrawFeaturePoint",
                                               multi: false
                                               }
                                               );

var path = new OpenLayers.Control.DrawFeature(
                                              wfstLine, OpenLayers.Handler.Path,
                                              {
                                              title: "Draw Path",
                                              displayClass: "olControlDrawFeaturePath",
                                              multi: false
                                              }
                                              );

var polygon = new OpenLayers.Control.DrawFeature(
                                                 wfstPolygon, OpenLayers.Handler.Polygon,
                                                 {
                                                 title: "Draw Polygon",
                                                 displayClass: "olControlDrawFeaturePolygon",
                                                 multi: false
                                                 }
                                                 );

var editPoint = new OpenLayers.Control.ModifyFeature(wfstPoint, {
                                                     id:"point",
                                                     standalone:true,
                                                     mode: OpenLayers.Control.ModifyFeature.DRAG// | OpenLayers.Control.ModifyFeature.RESHAPE | OpenLayers.Control.ModifyFeature.RESIZE | OpenLayers.Control.ModifyFeature.ROTATE
                                                     });
var editLine= new OpenLayers.Control.ModifyFeature(wfstLine,
                                                   {
                                                   id:"line",
                                                   standalone:true,
                                                   mode: OpenLayers.Control.ModifyFeature.RESHAPE | OpenLayers.Control.ModifyFeature.DRAG// | OpenLayers.Control.ModifyFeature.RESIZE | OpenLayers.Control.ModifyFeature.ROTATE
                                                   });
var editPolygon = new OpenLayers.Control.ModifyFeature(wfstPolygon,
                                                       {
                                                       id:"polygon",
                                                       standalone:true,
                                                       mode: OpenLayers.Control.ModifyFeature.RESHAPE | OpenLayers.Control.ModifyFeature.DRAG// | OpenLayers.Control.ModifyFeature.RESIZE | OpenLayers.Control.ModifyFeature.ROTATE
                                                       });

map.addControls([editPoint, editLine, editPolygon]);


var select = new OpenLayers.Control.SelectFeature(
                                                  [wfstPoint, wfstLine, wfstPolygon],
                                                  {
                                                  title : "Modify Feature",
                                                  displayClass: "olControlModifyFeature",
                                                  hover:true,
                                                  callbacks:{
                                                  'click':function(feature) {
                                                  editPoint.deactivate();
                                                  editLine.deactivate();
                                                  editPolygon.deactivate();
                                                  
                                                  feature.layer.map.getControl(feature.layer.id).activate();
                                                  feature.layer.map.getControl(feature.layer.id).selectFeature(feature);
                                                  },
                                                  'clickout':function(feature) {
                                                  feature.layer.map.getControl(feature.layer.id).deactivate();
                                                  }
                                                  }
                                                  });

var save = new OpenLayers.Control.Button({
                                         title: "Save Changes",
                                         trigger: function() {
                                         /*if(edit.feature) {
                                          edit.selectControl.unselectAll();
                                          }*/
                                         editPoint.deactivate();
                                         editLine.deactivate();
                                         editPolygon.deactivate();
                                         
                                         savePoint.save();
                                         saveLine.save();
                                         savePolygon.save();
                                         },
                                         displayClass: "olControlSaveFeatures"
                                         });


var del = new DeleteFeature([wfstPoint, wfstLine, wfstPolygon], {title: "Delete Feature", hover:true});

panel.addControls([save, del, select, point, path, polygon]);
map.addControl(panel);







/*
 var wfs = new OpenLayers.Layer.Vector("WFS (read only)", {
 strategies: [new OpenLayers.Strategy.BBOX()],
 protocol: new OpenLayers.Protocol.WFS({
 version: "1.1.0",
 srsName: "EPSG:4326",
 url:  "http://featureserver.org/fs?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=sqlite_pois",
 featurePrefix: "fs",
 featureType: "sqlite_pois",
 featureNS: "http://example.com/featureserver"
 })
 });
 map.addLayer(wfs);
 */
var boundsCH = new OpenLayers.Bounds(662963,5751192,1168000,6075059);
map.zoomToExtent(boundsCH, true);