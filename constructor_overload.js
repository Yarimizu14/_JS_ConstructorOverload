document.addEventListener("DOMContentLoaded", function() {
  function PP() {
    this.self = "this is grand p";
  }
  PP.prototype.prop = "prop";
  PP.prototype.method1 = function(a) { console.log(a); };

  function P() {
    this.self = "this is parent";
  }
  P.prototype = new PP();
  P.prototype.prop1 = "prop1";
  P.prototype.prop2 = "prop2";
  P.prototype.method1 = function(a) { console.log(a); };

  /*
   * --------------------------------------------------------------------
   * 目的： Pを継承したオブジェクトを異なるコンストラクタで生成したい！！
   * --------------------------------------------------------------------
   */

  /*
   * 1. constructorオーバーロードなし
   */
  function Point1(pt) {
      this.x = pt.x;
      this.y = pt.y;
      this.self = "I am child";
  }
  Point1.prototype = new P();
  Point1.prototype.propA = "propA";

  function Point2(x,y) {
      this.x = x;
      this.y = y;
      this.self = "I am child";
  }
  Point2.prototype = new P();
  Point2.prototype.propB = "propB";

  var P1 = new Point1({x:1, y:2});
  var P2 = new Point2(1, 2);

  console.log(P1.constructor);
  console.log(P2.constructor);

  /*
   * 継承できるがconstructor毎に継承しなければならない
   *
   * 2. constructorをオーバロードする関数を作成
   */

  function $overload(derivations, base) {
    var ctor = function() {};
    ctor.prototype = base.prototype;
    var proto = new ctor;
    for (var i in derivations) {
      derivations[i].prototype = proto;
    }
  }
  function Point1_2(pt) {
      this.x = pt.x;
      this.y = pt.y;
      this.self = "I am child";
  }
  Point1.prototype = new P();
  function Point2_2(x,y) {
      this.x = x;
      this.y = y;
      this.self = "I am child";
  }
  $overload([Point1, Point2], P);

  var P1_2 = new Point1({x:1, y:2});
  var P2_2 = new Point2(1, 2);

  console.log(P1_2.constructor);
  console.log(P2_2.constructor);


});
