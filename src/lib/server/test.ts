class PointA {
  constructor(
    private property = "This"
  ) {

  }

  function() {
    console.log(this.property);
  }
}