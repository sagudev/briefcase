async function parse_svg(svg_text) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svg_text, "image/svg+xml");
  const paths = svgDoc.querySelectorAll("path");
  return Array.from(paths).map((svg_path) => ({
    path: new Path2D(svg_path.getAttribute("d")),
    fill: svg_path.getAttribute("fill"),
    stroke: svg_path.getAttribute("stroke"),
    stroke_width: svg_path.getAttribute("stroke-width"),
  }));
}

async function fill_svg_paths(ctx, svg, x, y, zoom = 1) {
  ctx.save();
  ctx.translate(x, y); // or center based on viewBox
  ctx.scale(zoom, zoom);
  for (const obj of svg) {
    ctx.lineWidth = obj.stroke_width;
    ctx.fillStyle = obj.fill;
    ctx.strokeStyle = obj.stroke;
    //if (obj.stroke) ctx.stroke(obj.path);
    ctx.fill(obj.path);
  }
  ctx.restore();
}

async function fill_stroke_svg_paths(ctx, svg, x, y, zoom = 1) {
  ctx.save();
  ctx.translate(x, y); // or center based on viewBox
  ctx.scale(zoom, zoom);
  for (const obj of svg) {
    ctx.lineWidth = obj.stroke_width;
    ctx.fillStyle = obj.fill;
    ctx.strokeStyle = obj.stroke;
    if (obj.fill) ctx.fill(obj.path);
    if (obj.stroke) ctx.stroke(obj.path);
  }
  ctx.restore();
}

async function stroke_svg_paths(ctx, svg, x, y, zoom = 1) {
  ctx.save();
  ctx.translate(x, y); // or center based on viewBox
  ctx.scale(zoom, zoom);
  for (const obj of svg) {
    ctx.lineWidth = obj.stroke_width;
    ctx.strokeStyle = obj.fill;
    if (obj.stroke) ctx.strokeStyle = obj.stroke;
    ctx.stroke(obj.path);
  }
  ctx.restore();
}

async function load_svg(url) {
  return await fetch(url)
    .then((response) => response.text())
    .then(parse_svg);
}
