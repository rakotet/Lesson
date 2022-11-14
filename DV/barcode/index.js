import labelmake from "./node_modules/labelmake/dist/labelmake.min.js";

(async () => {
  const template = {
    basePdf: { width: 210, height: 297 },
    schemas: [
      {
        field1: {
          position: { x: 20, y: 20 },
          width: 50,
          height: 50,
          fontSize: 30,
          type: "text"
        },
        field2: {
          position: { x: 20, y: 35 },
          width: 50,
          height: 50,
          fontSize: 20,
          type: "text"
        }
      }
    ]
  };
  const inputs = [
    { field1: "aa", field2: "aaaaaaaaaaaa" },
    { field1: "bb", field2: "bbbbbbbbbbbb" }
  ];
  const pdf = await labelmake({ template, inputs });
  const blob = new Blob([pdf.buffer], { type: "application/pdf" });
  document.getElementById("iframe").src = URL.createObjectURL(blob);
})();