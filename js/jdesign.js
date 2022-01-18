let jdesign = function (config) {
  let raw = {
    data: JSON.parse(
      `{"product":{"id":"1","name":"Tshirt lengan pendek","category":"Tshirt","spesification":{"weight":400,"size":["xs","s","m","x","xl","xxl"],"model":"combat 60s"},"color":{"main":"#fefefe","recommendation":["#ff0000","#00ff00","#0000ff"]}},"display":{"key":0,"position":[{"available":true,"image":{"bottom":"https://i.ibb.co/Q8QsZPf/tshirt-depan-min.jpg","top":"https://i.ibb.co/B3R5gbF/tshirt-depan.png"},"printable":{"top":"65","left":"95","width":"140","height":"212"}},{"available":true,"image":{"bottom":"","top":""},"printable":{"top":"65","left":"95","width":"140","height":"212"}},{"available":true,"image":{"bottom":"","top":""},"printable":{"top":"65","left":"95","width":"140","height":"212"}},{"available":true,"image":{"bottom":"","top":""},"printable":{"top":"65","left":"95","width":"140","height":"212"}},{"available":true,"image":{"bottom":"https://i.ibb.co/ZhQ9DmM/tshirt-belakang-min.jpg","top":"https://i.ibb.co/47P3zWX/tshirt-belakang.png"},"printable":{"top":"65","left":"95","width":"140","height":"212"}}],"element":[{"layer":[]},{"layer":[]},{"layer":[]},{"layer":[]},{"layer":[]}]}}`
    ),
    text: JSON.parse(
      `{"type":"text","text":{"write":"Tegxt","align":"center","bold":false,"underline":false,"italic":false},"font":{"family":"","source":""},"size":{"fontsize":75,"letterspacing":0,"lineheight":100},"position":{"top":350,"left":352},"transform":{"rotate":0,"skew":0,"flip":{"vertical":false,"horizontal":false}},"color":{"background":{"type":"normal","main":["#000000"],"poslinear":0,"posradialx":50,"posradialy":50},"opacity":"100"},"effect":{"stroke":{"width":0,"color":"#000000"},"depth":{"type":0,"width":0,"color":"#000000"},"curve":{"type":1,"round":300, "degree": 75},"outline":{"width":0,"color":"#000000"}},"shadow":{"blur":0,"color":"#000000","posx":0,"posy":0}}`
    ),
    image: JSON.parse(
      `{"type":"image","src":"https://pluspng.com/img-png/png-naruto--855.png","position":{"top":500,"left":352},"dimension":{"natural":true,"width":200,"height":200,"naturalwidth":100,"naturalheight":100},"color":{"edit":{"mode":false,"main":"#ff0000"},"background":{"type":"normal","main":["#ff0000","#0000ff"],"poslinear":0,"posradialx":50,"posradialy":50},"filter":"","opacity":"100"},"transform":{"rotate":0,"skew":0,"flip":{"vertical":false,"horizontal":false}},"effect":{"stroke":{"width":0,"color":"#000000"},"depth":{"type":0,"width":0,"color":"#000000"},"outline":{"width":0,"color":"#000000"}},"shadow":{"blur":"0","color":"#000000","posx":50,"posy":50}, "round":{"top":{"left":10,"right":10}, "bottom":{"left":10,"right":10}}}`
    ),
  };
  let data = config.data != undefined ? config.data : raw.data;
  let api = config.api;
  let pixabay = {
    page: 1,
    keyword: "",
    type: "all",
    color: "",
  };

  let input = [
    {
      pointer: "action",
      event: (v = null) => {
        if (v != null) {
          $('[data-jd-class="action"]').css("display", "none");
          $(`[data-jd-class="action"][data-jd-value="${v}"]`).css(
            "display",
            "block"
          );
          render.all();
        }
      },
    },
    {
      pointer: "product",
      event: (v = null) => {
        if (v != null) {
          let d = JSON.parse(decodeURIComponent(v));
          let e = `${JSON.stringify(data.display.element[data.display.key])}`;
          data.product = JSON.parse(`${JSON.stringify(d.product)}`);
          data.display.key = d.display.key;
          data.display.position = JSON.parse(
            `${JSON.stringify(d.display.position)}`
          );
          data.display.element[data.display.key] = JSON.parse(`${e}`);
          render.all();
        }
      },
    },
    {
      pointer: "template",
      event: (v = null) => {
        if (v != null) {
          let od = JSON.stringify(data.display.element[data.display.key].layer);
          od = od.substring(0, od.length - 1);
          let nd =
            data.display.element[data.display.key].layer.length == 0
              ? String(decodeURIComponent(v)).replace("[", "")
              : String(decodeURIComponent(v)).replace("[", ",");
          let d = od + nd;
          data.display.element[data.display.key].layer = JSON.parse(`${d}`);
          render.all();
        }
      },
    },
    {
      pointer: "element-add",
      event: (v = null) => {
        if (v != null) {
          let od = JSON.stringify(data.display.element[data.display.key].layer);
          let nd = "";
          let d = "";
          switch (v) {
            case "text":
              od = od.substring(0, od.length - 1);
              nd =
                data.display.element[data.display.key].layer.length == 0
                  ? JSON.stringify(raw.text)
                  : "," + JSON.stringify(raw.text);
              d = od + nd + "]";
              data.display.element[data.display.key].layer = JSON.parse(`${d}`);
              break;
            case "image":
              od = od.substring(0, od.length - 1);
              nd =
                data.display.element[data.display.key].layer.length == 0
                  ? JSON.stringify(raw.image)
                  : "," + JSON.stringify(raw.image);
              d = od + nd + "]";
              data.display.element[data.display.key].layer = JSON.parse(`${d}`);
              break;
          }
          render.all();
        }

        $(`[data-jd-class="action-element-layer"]`).html("");
        let t = decodeURIComponent(
          $(`[data-jd-class="action-element-layer"]`).attr("data-jd-template")
        );
        $.each(data.display.element[data.display.key].layer, function (i, v) {
          let tn = t
            .replace(
              /\$\{element\.attr\}/g,
              `data-jd-class="input-click" data-jd-pointer="element-edit" data-jd-value="${i}"`
            )
            .replace(
              /\$\{element\.name\}/g,
              `${v.type == "text" ? v.text.write : v.src}`
            );
          $(`[data-jd-class="action-element-layer"]`).prepend(`${tn}`);
        });
      },
    },
    {
      pointer: "element-edit",
      event: (v = null) => {
        if (v != null) {
          let a = String(
            $(`[data-jd-class="action-element-layer"]`).attr("data-jd-value")
          ).split("|");
          render.layer = Number(v);
          render.all();
          data.display.element[data.display.key].layer[v].type == "text"
            ? render.input("action", a[0])
            : render.input("action", a[1]);
        }
        render.layer == data.display.element[data.display.key].layer.length - 1
          ? $(`[data-jd-pointer="layer-pos"][data-jd-value="up"]`).css({
              display: "none",
            })
          : $(`[data-jd-pointer="layer-pos"][data-jd-value="up"]`).css({
              display: "block",
            });
        render.layer == 0
          ? $(`[data-jd-pointer="layer-pos"][data-jd-value="down"]`).css({
              display: "none",
            })
          : $(`[data-jd-pointer="layer-pos"][data-jd-value="down"]`).css({
              display: "block",
            });
      },
    },
    {
      pointer: "text-textwrite",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].text.write = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-textwrite']`).val(
          data.display.element[data.display.key].layer[render.layer].text.write
        );
      },
    },
    {
      pointer: "text-textbold",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[render.layer].text.bold =
            v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-textbold']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].text.bold
        );
      },
    },
    {
      pointer: "text-textitalic",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].text.italic = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-textitalic']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].text.italic
        );
      },
    },
    {
      pointer: "text-textunderline",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].text.underline = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-textunderline']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].text
            .underline
        );
      },
    },
    {
      pointer: "text-textalign",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].text.align = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-textalign']`).val(
          data.display.element[data.display.key].layer[render.layer].text.align
        );
      },
    },

    {
      pointer: "text-style",
      event: (v = null) => {
        if (v != null) {
          let s = JSON.parse(decodeURIComponent(v));
          s.text.write =
            data.display.element[data.display.key].layer[
              render.layer
            ].text.write;
          s.position =
            data.display.element[data.display.key].layer[render.layer].position;
          data.display.element[data.display.key].layer[render.layer] = s;
          render.elementLayer(render.layer);
        }
      },
    },
    {
      pointer: "text-font",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[render.layer].font =
            JSON.parse(decodeURIComponent(v));
          render.elementLayer(render.layer);
        }
      },
    },
    {
      pointer: "text-positionx",
      event: (v = null) => {
        let mn = -200;
        let mx = 1000;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].position.left = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-positionx']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-positionx']`).val(
          data.display.element[data.display.key].layer[render.layer].position
            .left
        );
      },
    },
    {
      pointer: "text-positiony",
      event: (v = null) => {
        let mn = -200;
        let mx = 1000;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].position.top = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-positiony']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-positiony']`).val(
          data.display.element[data.display.key].layer[render.layer].position
            .top
        );
      },
    },
    {
      pointer: "text-sizefontsize",
      event: (v = null) => {
        let mn = 0;
        let mx = 1000;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].size.fontsize = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-sizefontsize']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-sizefontsize']`).val(
          data.display.element[data.display.key].layer[render.layer].size
            .fontsize
        );
      },
    },
    {
      pointer: "text-sizeletterspacing",
      event: (v = null) => {
        let mn = -10;
        let mx = 200;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].size.letterspacing = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-sizeletterspacing']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-sizeletterspacing']`).val(
          data.display.element[data.display.key].layer[render.layer].size
            .letterspacing
        );
      },
    },
    {
      pointer: "text-sizelineheight",
      event: (v = null) => {
        let mn = 100;
        let mx = 300;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].size.lineheight = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-sizelineheight']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-sizelineheight']`).val(
          data.display.element[data.display.key].layer[render.layer].size
            .lineheight
        );
      },
    },
    {
      pointer: "text-transformrotate",
      event: (v = null) => {
        let mn = -180;
        let mx = 180;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.rotate = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-transformrotate']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-transformrotate']`).val(
          data.display.element[data.display.key].layer[render.layer].transform
            .rotate
        );
      },
    },
    {
      pointer: "text-transformskew",
      event: (v = null) => {
        let mn = -88;
        let mx = 88;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.skew = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-transformskew']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-transformskew']`).val(
          data.display.element[data.display.key].layer[render.layer].transform
            .skew
        );
      },
    },
    {
      pointer: "text-transformfliphorizontal",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.flip.horizontal = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-transformfliphorizontal']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].transform
            .flip.horizontal
        );
      },
    },
    {
      pointer: "text-transformflipvertical",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.flip.vertical = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-transformflipvertical']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].transform
            .flip.vertical
        );
      },
    },
    {
      pointer: "text-color",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.main[
            data.display.element[data.display.key].layer[render.layer].color
              .background.main.length - 1
          ] = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-color']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.main[
            data.display.element[data.display.key].layer[render.layer].color
              .background.main.length - 1
          ]
        );
      },
    },
    {
      pointer: "text-colortype",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.type = v;
          if (
            data.display.element[data.display.key].layer[render.layer].color
              .background.type == "normal" ||
            data.display.element[data.display.key].layer[render.layer].color
              .background.type == "same-parent"
          ) {
            data.display.element[data.display.key].layer[
              render.layer
            ].color.background.main = [
              data.display.element[data.display.key].layer[render.layer].color
                .background.main[
                data.display.element[data.display.key].layer[render.layer].color
                  .background.main.length - 1
              ],
            ];
          }
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-colortype']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.type
        );
        data.display.element[data.display.key].layer[render.layer].color
          .background.type != "normal" &&
        data.display.element[data.display.key].layer[render.layer].color
          .background.type != "same-parent"
          ? $(`[data-jd-pointer='text-coloradd']`).css({
              display: "block",
            })
          : $(`[data-jd-pointer='text-coloradd']`).css({
              display: "none",
            });
        data.display.element[data.display.key].layer[render.layer].color
          .background.type == "linear-gradient"
          ? $(`[data-jd-pointer='text-colorposlinear']`).css({
              display: "block",
            })
          : $(`[data-jd-pointer='text-colorposlinear']`).css({
              display: "none",
            });
        data.display.element[data.display.key].layer[render.layer].color
          .background.type == "radial-gradient"
          ? $(
              `[data-jd-pointer='text-colorposrasialx'], [data-jd-pointer='text-colorposrasialy']`
            ).css({
              display: "block",
            })
          : $(
              `[data-jd-pointer='text-colorposrasialx'], [data-jd-pointer='text-colorposrasialy']`
            ).css({
              display: "none",
            });
      },
    },
    {
      pointer: "text-coloradd",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.main.push(
            render.colorinvert(
              data.display.element[data.display.key].layer[render.layer].color
                .background.main[
                data.display.element[data.display.key].layer[render.layer].color
                  .background.main.length - 1
              ]
            )
          );
          render.elementLayer(render.layer);
        }
      },
    },
    {
      pointer: "text-coloropacity",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.opacity = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-coloropacity']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-coloropacity']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .opacity
        );
      },
    },
    {
      pointer: "text-colorposlinear",
      event: (v = null) => {
        let mn = -180;
        let mx = 180;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.poslinear = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-colorposlinear']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-colorposlinear']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.poslinear
        );
      },
    },
    {
      pointer: "text-colorposrasialx",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.posradialx = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-colorposrasialx']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-colorposrasialx']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.posradialx
        );
      },
    },
    {
      pointer: "text-colorposrasialy",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.posradialy = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-colorposrasialy']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-colorposrasialy']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.posradialy
        );
      },
    },
    {
      pointer: "text-effectstrokecolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.stroke.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectstrokecolor']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .stroke.color
        );
      },
    },
    {
      pointer: "text-effectstrokewidth",
      event: (v = null) => {
        let mn = 0;
        let mx = 35;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.stroke.width = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectstrokewidth']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-effectstrokewidth']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .stroke.width
        );
      },
    },
    {
      pointer: "text-effectdepthtype",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.depth.type = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectdepthtype']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .depth.type
        );
      },
    },
    {
      pointer: "text-effectdepthcolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.depth.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectdepthcolor']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .depth.color
        );
      },
    },
    {
      pointer: "text-effectdepthwidth",
      event: (v = null) => {
        let mn = 0;
        let mx = 15;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.depth.width = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectdepthwidth']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-effectdepthwidth']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .depth.width
        );
      },
    },
    {
      pointer: "text-effectoutlinecolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.outline.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectoutlinecolor']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .outline.color
        );
      },
    },
    {
      pointer: "text-effectoutlinewidth",
      event: (v = null) => {
        let mn = 0;
        let mx = 35;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.outline.width = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectoutlinewidth']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-effectoutlinewidth']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .outline.width
        );
      },
    },
    {
      pointer: "text-effectcurvetype",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.curve.type = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectcurvetype']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .curve.type
        );
      },
    },

    {
      pointer: "text-effectcurveround",
      event: (v = null) => {
        let mn = 100;
        let mx = 700;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.curve.round = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectcurveround']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-effectcurveround']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .curve.round
        );
      },
    },
    {
      pointer: "text-effectcurvedegree",
      event: (v = null) => {
        let mn = 0;
        let mx = 180;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.curve.degree = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-effectcurvedegree']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-effectcurvedegree']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .curve.degree
        );
      },
    },
    {
      pointer: "text-shadowcolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-shadowcolor']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow
            .color
        );
      },
    },
    {
      pointer: "text-shadowblur",
      event: (v = null) => {
        let mn = 0;
        let mx = 50;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.blur = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-shadowblur']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-shadowblur']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow.blur
        );
      },
    },
    {
      pointer: "text-shadowposx",
      event: (v = null) => {
        let mn = -350;
        let mx = 350;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.posx = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-shadowposx']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-shadowposx']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow.posx
        );
      },
    },
    {
      pointer: "text-shadowposy",
      event: (v = null) => {
        let mn = -350;
        let mx = 350;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.posy = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='text-shadowposy']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='text-shadowposy']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow.posy
        );
      },
    },
    {
      pointer: "image-selectupload",
      event: (v = null) => {
        if (v != null) {
          $(
            `.jd-canvas-element-layer[data-canvas-element-layer="${render.layer}"]`
          )
            .css("background-image", "")
            .html(`<span style="font-size: 0.1em">Loading...</span>`);
          var file = document.querySelector(
            `[data-jd-pointer='image-selectupload']`
          );
          var form = new FormData();
          form.append("image", file.files[0]);

          var settings = {
            url: `https://api.imgbb.com/1/upload?key=${api.imgbb}`,
            method: "POST",
            timeout: 0,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: form,
          };

          $.ajax(settings).done(function (response) {
            var jx = JSON.parse(response);
            data.display.element[data.display.key].layer[render.layer].src =
              jx.data.url;
            ((imgSrc) => {
              var newImg = new Image();
              newImg.onload = function () {
                data.display.element[data.display.key].layer[
                  render.layer
                ].dimension.naturalwidth = newImg.width;
                data.display.element[data.display.key].layer[
                  render.layer
                ].dimension.naturalheight = newImg.height;
                $(
                  `.jd-canvas-element-layer[data-canvas-element-layer="${render.layer}"]`
                ).html(``);
                render.elementLayer(render.layer);
              };
              newImg.src = imgSrc;
            })(data.display.element[data.display.key].layer[render.layer].src);
          });
        }
      },
    },
    {
      pointer: "image-selectimport",
      event: (v = null) => {
        if (v != null) {
          console.log(v);
          $(
            `.jd-canvas-element-layer[data-canvas-element-layer="${render.layer}"]`
          )
            .css("background-image", "")
            .html(`<span style="font-size: 0.1em">Loading...</span>`);
          data.display.element[data.display.key].layer[render.layer].src = v;
          ((imgSrc) => {
            var newImg = new Image();
            newImg.onload = function () {
              data.display.element[data.display.key].layer[
                render.layer
              ].dimension.naturalwidth = newImg.width;
              data.display.element[data.display.key].layer[
                render.layer
              ].dimension.naturalheight = newImg.height;
              $(
                `.jd-canvas-element-layer[data-canvas-element-layer="${render.layer}"]`
              ).html(``);
              render.elementLayer(render.layer);
            };
            newImg.src = imgSrc;
          })(data.display.element[data.display.key].layer[render.layer].src);
        }
      },
    },
    // -dev
    {
      pointer: "image-selectpixabaykeyword",
      event: (v = null) => {
        if (v != null) {
          pixabay.keyword = v;
        }
      },
    },
    {
      pointer: "image-selectpixabaycolor",
      event: (v = null) => {
        if (v != null) {
          pixabay.color = v;
        }
      },
    },
    {
      pointer: "image-selectpixabaytype",
      event: (v = null) => {
        if (v != null) {
          pixabay.type = v;
        }
      },
    },
    {
      pointer: "image-selectpixabaysearch",
      event: (v = null, p = 1) => {
        if (v != null) {
          console.log(pixabay);
          pixabay.page = 1;
          var settings = {
            url: `https://pixabay.com/api/?key=${encodeURIComponent(
              api.pixabay
            )}&q=${encodeURIComponent(
              pixabay.keyword
            )}&image_type=${encodeURIComponent(
              pixabay.type
            )}&page=${encodeURIComponent(
              pixabay.page
            )}&colors=${encodeURIComponent(
              pixabay.color
            )}&safesearch=true&pretty=true`,
            method: "GET",
            timeout: 0,
            processData: false,
            contentType: false,
          };
          $(`[data-jd-class='action-image-selectpixabaylist']`).html("");
          $.ajax(settings).done(function (response) {
            $.each(response.hits, function (index, value) {
              let t = decodeURIComponent(
                $(`[data-jd-class='action-image-selectpixabaylist']`).attr(
                  "data-jd-template"
                )
              );
              let tn = t
                .replace(
                  /\$\{image\.attr\}/g,
                  `data-jd-class="input-click" data-jd-pointer="image-selectpixabay" data-jd-value="${response.hits[index].webformatURL}"`
                )
                .replace(
                  /\$\{image\.preview\}/g,
                  `${response.hits[index].previewURL}`
                );
              // <img src="${response.hits[index].previewURL}" class="img-thumbnail" style="max-width: 200px" data-jd-class="input-click" data-jd-pointer="image-selectpixabay" data-jd-value="${response.hits[index].webformatURL}">
              $(`[data-jd-class='action-image-selectpixabaylist']`).append(tn);
            });
            if (response.hits.length < 20) {
              $(`[data-jd-class='action-image-selectpixabaylist']`).append(
                "not found?"
              );
            }
            response.hits.length == 20
              ? $(`[data-jd-pointer='image-selectpixabaynext']`).css({
                  display: "initial",
                })
              : $(`[data-jd-pointer='image-selectpixabaynext']`).css({
                  display: "none",
                });
          });
        }
      },
    },
    {
      pointer: "image-selectpixabaynext",
      event: (v = null) => {
        if (v != null) {
          pixabay.page += 1;
          var settings = {
            url: `https://pixabay.com/api/?key=${encodeURIComponent(
              api.pixabay
            )}&q=${encodeURIComponent(
              pixabay.keyword
            )}&image_type=${encodeURIComponent(
              pixabay.type
            )}&page=${encodeURIComponent(
              pixabay.page
            )}&colors=${encodeURIComponent(
              pixabay.color
            )}&safesearch=true&pretty=true`,
            method: "GET",
            timeout: 0,
            processData: false,
            contentType: false,
          };
          $.ajax(settings).done(function (response) {
            $.each(response.hits, function (index, value) {
              let t = decodeURIComponent(
                $(`[data-jd-class='action-image-selectpixabaylist']`).attr(
                  "data-jd-template"
                )
              );
              let tn = t
                .replace(
                  /\$\{image\.attr\}/g,
                  `data-jd-class="input-click" data-jd-pointer="image-selectpixabay" data-jd-value="${response.hits[index].webformatURL}"`
                )
                .replace(
                  /\$\{image\.preview\}/g,
                  `${response.hits[index].previewURL}`
                );
              // <img src="${response.hits[index].previewURL}" class="img-thumbnail" style="max-width: 200px" data-jd-class="input-click" data-jd-pointer="image-selectpixabay" data-jd-value="${response.hits[index].webformatURL}">
              $(`[data-jd-class='action-image-selectpixabaylist']`).append(tn);
            });
            if (response.hits.length < 20) {
              $(`[data-jd-class='action-image-selectpixabaylist']`).append(
                "not found?"
              );
            }
            response.hits.length == 20
              ? $(`[data-jd-pointer='image-selectpixabaynext']`).css({
                  display: "initial",
                })
              : $(`[data-jd-pointer='image-selectpixabaynext']`).css({
                  display: "none",
                });
          });
        }
      },
    },
    {
      pointer: "image-selectpixabay",
      event: (v = null) => {
        if (v != null) {
          $(
            `.jd-canvas-element-layer[data-canvas-element-layer="${render.layer}"]`
          )
            .css("background-image", "")
            .html(`<span style="font-size: 0.1em">Loading...</span>`);
          var settings = {
            url: `https://api.imgbb.com/1/upload?key=${api.imgbb}&image=${v}`,
            method: "GET",
            timeout: 0,
            processData: false,
          };

          $.ajax(settings).done(function (response) {
            console.log(response);
            var jx = response; //JSON.parse(response);
            data.display.element[data.display.key].layer[render.layer].src =
              jx.data.url;
            ((imgSrc) => {
              var newImg = new Image();
              newImg.onload = function () {
                data.display.element[data.display.key].layer[
                  render.layer
                ].dimension.naturalwidth = newImg.width;
                data.display.element[data.display.key].layer[
                  render.layer
                ].dimension.naturalheight = newImg.height;
                $(
                  `.jd-canvas-element-layer[data-canvas-element-layer="${render.layer}"]`
                ).html(``);
                render.elementLayer(render.layer);
              };
              newImg.src = imgSrc;
            })(data.display.element[data.display.key].layer[render.layer].src);
          });
          console.log(v);
        }
      },
    },
    {
      pointer: "image-positionx",
      event: (v = null) => {
        let mn = -200;
        let mx = 1000;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].position.left = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-positionx']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-positionx']`).val(
          data.display.element[data.display.key].layer[render.layer].position
            .left
        );
      },
    },

    {
      pointer: "image-positiony",
      event: (v = null) => {
        let mn = -200;
        let mx = 1000;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].position.top = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-positiony']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-positiony']`).val(
          data.display.element[data.display.key].layer[render.layer].position
            .top
        );
      },
    },
    {
      pointer: "image-transformrotate",
      event: (v = null) => {
        let mn = -180;
        let mx = 180;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.rotate = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-transformrotate']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-transformrotate']`).val(
          data.display.element[data.display.key].layer[render.layer].transform
            .rotate
        );
      },
    },
    {
      pointer: "image-transformskew",
      event: (v = null) => {
        let mn = -88;
        let mx = 88;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.skew = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-transformskew']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-transformskew']`).val(
          data.display.element[data.display.key].layer[render.layer].transform
            .skew
        );
      },
    },
    {
      pointer: "image-transformfliphorizontal",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.flip.horizontal = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-transformfliphorizontal']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].transform
            .flip.horizontal
        );
      },
    },
    {
      pointer: "image-transformflipvertical",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].transform.flip.vertical = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-transformflipvertical']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].transform
            .flip.vertical
        );
      },
    },
    {
      pointer: "image-dimensionnatural",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].dimension.natural = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-dimensionnatural']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].dimension
            .natural
        );
      },
    },
    {
      pointer: "image-dimensionwidth",
      event: (v = null) => {
        let mn = 0;
        let mx = 1000;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].dimension.width = v;
          if (
            data.display.element[data.display.key].layer[render.layer].dimension
              .natural
          ) {
            data.display.element[data.display.key].layer[
              render.layer
            ].dimension.height =
              (data.display.element[data.display.key].layer[render.layer]
                .dimension.width *
                data.display.element[data.display.key].layer[render.layer]
                  .dimension.naturalheight) /
              data.display.element[data.display.key].layer[render.layer]
                .dimension.naturalwidth;
            $(`[data-jd-pointer='image-dimensionheight']`).attr({
              min: mn,
              max: mx,
            });
            $(`[data-jd-pointer='image-dimensionheight']`).val(
              data.display.element[data.display.key].layer[render.layer]
                .dimension.height
            );
          }
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-dimensionwidth']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-dimensionwidth']`).val(
          data.display.element[data.display.key].layer[render.layer].dimension
            .width
        );
      },
    },
    {
      pointer: "image-dimensionheight",
      event: (v = null) => {
        let mn = 0;
        let mx = 1000;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].dimension.height = v;
          if (
            data.display.element[data.display.key].layer[render.layer].dimension
              .natural
          ) {
            data.display.element[data.display.key].layer[
              render.layer
            ].dimension.width =
              (data.display.element[data.display.key].layer[render.layer]
                .dimension.naturalwidth *
                data.display.element[data.display.key].layer[render.layer]
                  .dimension.height) /
              data.display.element[data.display.key].layer[render.layer]
                .dimension.naturalheight;
            $(`[data-jd-pointer='image-dimensionwidth']`).attr({
              min: mn,
              max: mx,
            });
            $(`[data-jd-pointer='image-dimensionwidth']`).val(
              data.display.element[data.display.key].layer[render.layer]
                .dimension.width
            );
          }
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-dimensionheight']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-dimensionheight']`).val(
          data.display.element[data.display.key].layer[render.layer].dimension
            .height
        );
      },
    },
    {
      pointer: "image-color",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.main[
            data.display.element[data.display.key].layer[render.layer].color
              .background.main.length - 1
          ] = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-color']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.main[
            data.display.element[data.display.key].layer[render.layer].color
              .background.main.length - 1
          ]
        );
      },
    },
    {
      pointer: "image-colortype",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.type = v;
          if (
            data.display.element[data.display.key].layer[render.layer].color
              .background.type == "normal" ||
            data.display.element[data.display.key].layer[render.layer].color
              .background.type == "same-parent"
          ) {
            data.display.element[data.display.key].layer[
              render.layer
            ].color.background.main = [
              data.display.element[data.display.key].layer[render.layer].color
                .background.main[
                data.display.element[data.display.key].layer[render.layer].color
                  .background.main.length - 1
              ],
            ];
          }
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-colortype']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.type
        );
        data.display.element[data.display.key].layer[render.layer].color
          .background.type != "normal" &&
        data.display.element[data.display.key].layer[render.layer].color
          .background.type != "same-parent"
          ? $(`[data-jd-pointer='image-coloradd']`).css({
              display: "block",
            })
          : $(`[data-jd-pointer='image-coloradd']`).css({
              display: "none",
            });
        data.display.element[data.display.key].layer[render.layer].color
          .background.type == "linear-gradient"
          ? $(`[data-jd-pointer='image-colorposlinear']`).css({
              display: "block",
            })
          : $(`[data-jd-pointer='image-colorposlinear']`).css({
              display: "none",
            });
        data.display.element[data.display.key].layer[render.layer].color
          .background.type == "radial-gradient"
          ? $(
              `[data-jd-pointer='image-colorposrasialx'], [data-jd-pointer='image-colorposrasialy']`
            ).css({
              display: "block",
            })
          : $(
              `[data-jd-pointer='image-colorposrasialx'], [data-jd-pointer='image-colorposrasialy']`
            ).css({
              display: "none",
            });
      },
    },
    {
      pointer: "image-coloradd",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.main.push(
            render.colorinvert(
              data.display.element[data.display.key].layer[render.layer].color
                .background.main[
                data.display.element[data.display.key].layer[render.layer].color
                  .background.main.length - 1
              ]
            )
          );
          render.elementLayer(render.layer);
        }
      },
    },
    {
      pointer: "image-coloropacity",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.opacity = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-coloropacity']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-coloropacity']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .opacity
        );
      },
    },
    {
      pointer: "image-colorposlinear",
      event: (v = null) => {
        let mn = -180;
        let mx = 180;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.poslinear = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-colorposlinear']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-colorposlinear']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.poslinear
        );
      },
    },
    {
      pointer: "image-colorposrasialx",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.posradialx = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-colorposrasialx']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-colorposrasialx']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.posradialx
        );
      },
    },
    {
      pointer: "image-colorposrasialy",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].color.background.posradialy = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-colorposrasialy']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-colorposrasialy']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .background.posradialy
        );
      },
    },
    {
      pointer: "image-coloreditmode",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.edit.mode = v == "true" ? true : false;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-coloreditmode']`).prop(
          "checked",
          data.display.element[data.display.key].layer[render.layer].color.edit
            .mode
        );
      },
    },
    {
      pointer: "image-coloreditmain",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.edit.main = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-coloreditmain']`).val(
          data.display.element[data.display.key].layer[render.layer].color.edit
            .main
        );
      },
    },
    {
      pointer: "image-colorfilter",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].color.filter = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-colorfilter']`).val(
          data.display.element[data.display.key].layer[render.layer].color
            .filter
        );
      },
    },
    {
      pointer: "image-effectstrokecolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.stroke.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-effectstrokecolor']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .stroke.color
        );
      },
    },
    {
      pointer: "image-effectstrokewidth",
      event: (v = null) => {
        let mn = 0;
        let mx = 35;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.stroke.width = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-effectstrokewidth']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-effectstrokewidth']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .stroke.width
        );
      },
    },
    {
      pointer: "image-effectdepthtype",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.depth.type = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-effectdepthtype']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .depth.type
        );
      },
    },
    {
      pointer: "image-effectdepthcolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.depth.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-effectdepthcolor']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .depth.color
        );
      },
    },
    {
      pointer: "image-effectdepthwidth",
      event: (v = null) => {
        let mn = 0;
        let mx = 15;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.depth.width = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-effectdepthwidth']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-effectdepthwidth']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .depth.width
        );
      },
    },
    {
      pointer: "image-effectoutlinecolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.outline.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-effectoutlinecolor']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .outline.color
        );
      },
    },
    {
      pointer: "image-effectoutlinewidth",
      event: (v = null) => {
        let mn = 0;
        let mx = 35;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].effect.outline.width = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-effectoutlinewidth']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-effectoutlinewidth']`).val(
          data.display.element[data.display.key].layer[render.layer].effect
            .outline.width
        );
      },
    },
    {
      pointer: "image-shadowcolor",
      event: (v = null) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.color = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-shadowcolor']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow
            .color
        );
      },
    },
    {
      pointer: "image-shadowblur",
      event: (v = null) => {
        let mn = 0;
        let mx = 50;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.blur = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-shadowblur']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-shadowblur']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow.blur
        );
      },
    },
    {
      pointer: "image-shadowposx",
      event: (v = null) => {
        let mn = -350;
        let mx = 350;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.posx = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-shadowposx']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-shadowposx']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow.posx
        );
      },
    },
    {
      pointer: "image-shadowposy",
      event: (v = null) => {
        let mn = -350;
        let mx = 350;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].shadow.posy = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-shadowposy']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-shadowposy']`).val(
          data.display.element[data.display.key].layer[render.layer].shadow.posy
        );
      },
    },
    {
      pointer: "image-roundtopleft",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].round.top.left = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-roundtopleft']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-roundtopleft']`).val(
          data.display.element[data.display.key].layer[render.layer].round.top
            .left
        );
      },
    },
    {
      pointer: "image-roundtopright",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].round.top.right = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-roundtopright']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-roundtopright']`).val(
          data.display.element[data.display.key].layer[render.layer].round.top
            .right
        );
      },
    },
    {
      pointer: "image-roundbottomleft",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].round.bottom.left = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-roundbottomleft']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-roundbottomleft']`).val(
          data.display.element[data.display.key].layer[render.layer].round
            .bottom.left
        );
      },
    },
    {
      pointer: "image-roundbottomright",
      event: (v = null) => {
        let mn = 0;
        let mx = 100;
        if (v != null) {
          v = Number(v);
          v = v <= mn ? mn : v;
          v = v >= mx ? mx : v;
          data.display.element[data.display.key].layer[
            render.layer
          ].round.bottom.right = v;
          render.elementLayer(render.layer);
        }
        $(`[data-jd-pointer='image-roundbottomright']`).attr({
          min: mn,
          max: mx,
        });
        $(`[data-jd-pointer='image-roundbottomright']`).val(
          data.display.element[data.display.key].layer[render.layer].round
            .bottom.right
        );
      },
    },
    {
      pointer: "layer-pos",
      event: (v = null) => {
        if (v != null) {
          switch (v) {
            case "up":
              break;
            case "down":
              break;
          }
        }
      },
    },
    {
      pointer: "color",
      event: (v = null) => {
        if (v != null) {
          data.product.color.main = v;
          render.color();
        }

        $(`[data-jd-pointer='color']`).attr(
          "data-jd-value",
          data.product.color.main
        );
        $(`[data-jd-pointer='color']`).val(data.product.color.main);
        $(`[data-jd-class='action-color-recommendation']`).html("");
        $.each(data.product.color.recommendation, function (i, v) {
          $(`[data-jd-class='action-color-recommendation']`).append(`
                <button type="button" class="jd-input-add btn m-1 rounded" data-jd-class="input-click" data-jd-pointer="color" data-jd-value="${data.product.color.recommendation[i]}" style="background-color: ${data.product.color.recommendation[i]}">&nbsp;</button>`);
        });
      },
    },
  ];

  let render = {
    layer: -1,
    color: () => {
      $("#jd-canvas-color").css(
        "backgroundColor",
        `${data.product.color.main}`
      );
    },
    colorinvert: (hex) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = Number(parseInt(result[1], 16)) <= 127.5 ? "ff" : "00";
      let g = Number(parseInt(result[2], 16)) <= 127.5 ? "ff" : "00";
      let b = Number(parseInt(result[3], 16)) <= 127.5 ? "ff" : "00";
      return `#${r}${g}${b}`;
    },
    position: () => {
      $("#jd-canvas-bottom").css(
        "backgroundImage",
        `url('${data.display.position[data.display.key].image.bottom}')`
      );
      $("#jd-canvas-top").css(
        "backgroundImage",
        `url('${data.display.position[data.display.key].image.top}')`
      );
    },
    element: () => {
      $("#jd-canvas-element").html("");
      $.each(data.display.element[data.display.key].layer, function (i, v) {
        $("#jd-canvas-element").append(
          `<div class="jd-canvas-element-${
            data.display.element[data.display.key].layer[i].type
          } jd-canvas-element-layer" data-canvas-element-type="${
            data.display.element[data.display.key].layer[i].type
          }" data-canvas-element-layer="${i}"></div>`
        );
        render.elementLayer(i);
      });
    },
    elementLayer: (n) => {
      let posPointer = {
        outline: [
          {
            x: "-",
            y: "-",
          },
          {
            x: "",
            y: "",
          },
          {
            x: "",
            y: "-",
          },
          {
            x: "-",
            y: "",
          },
        ],
        depth: [
          {
            x: -1,
            y: -1,
          },
          {
            x: 0,
            y: -1,
          },
          {
            x: 1,
            y: -1,
          },
          {
            x: 1,
            y: 0,
          },
          {
            x: 1,
            y: 1,
          },
          {
            x: 0,
            y: 1,
          },
          {
            x: -1,
            y: 1,
          },
          {
            x: -1,
            y: 0,
          },
        ],
      };
      let outline = ``;
      let stroke = ``;
      let depth = ``;
      let color = `linear-gradient(0deg, ${
        data.display.element[data.display.key].layer[n].color.background.main[
          data.display.element[data.display.key].layer[n].color.background.main
            .length - 1
        ]
      }, ${
        data.display.element[data.display.key].layer[n].color.background.main[
          data.display.element[data.display.key].layer[n].color.background.main
            .length - 1
        ]
      })`;
      let gradient = `${
        data.display.element[data.display.key].layer[n].color.background.main[
          data.display.element[data.display.key].layer[n].color.background.main
            .length - 1
        ]
      }, ${
        data.display.element[data.display.key].layer[n].color.background.main[
          data.display.element[data.display.key].layer[n].color.background.main
            .length - 1
        ]
      }`;
      let shadow = `${
        data.display.element[data.display.key].layer[n].shadow.blur == 0 &&
        data.display.element[data.display.key].layer[n].shadow.posx == 0 &&
        data.display.element[data.display.key].layer[n].shadow.posy == 0
          ? ``
          : `drop-shadow(${(
              data.display.element[data.display.key].layer[n].shadow.posx / 100
            ).toFixed(3)}em ${(
              data.display.element[data.display.key].layer[n].shadow.posy / 100
            ).toFixed(3)}em ${(
              data.display.element[data.display.key].layer[n].shadow.blur / 100
            ).toFixed(3)}em ${
              data.display.element[data.display.key].layer[n].shadow.color
            })`
      }`;
      if (
        data.display.element[data.display.key].layer[n].color.background.main
          .length > 1
      ) {
        gradient = ``;
        for (
          let j = 0;
          j <
          data.display.element[data.display.key].layer[n].color.background.main
            .length;
          j++
        ) {
          gradient += `${
            data.display.element[data.display.key].layer[n].color.background
              .main[j]
          },`;
        }
        gradient = gradient.substring(0, gradient.length - 1);
      }
      switch (
        data.display.element[data.display.key].layer[n].color.background.type
      ) {
        case "linear-gradient":
          color = `linear-gradient(${
            data.display.element[data.display.key].layer[n].color.background
              .poslinear
          }deg, ${gradient})`;
          break;
        case "radial-gradient":
          color = `radial-gradient(circle at ${
            data.display.element[data.display.key].layer[n].color.background
              .posradialx
          }% ${
            data.display.element[data.display.key].layer[n].color.background
              .posradialy
          }%, ${gradient})`;
          break;
        case "same-parent":
          color = `linear-gradient(0deg, ${data.product.color.main}, ${data.product.color.main})`;
          break;
      }
      for (var k = 0; k < posPointer.outline.length; k++) {
        outline += `drop-shadow(${posPointer.outline[k].x}${(
          data.display.element[data.display.key].layer[n].effect.outline.width /
          1000
        ).toFixed(3)}em ${posPointer.outline[k].y}${(
          data.display.element[data.display.key].layer[n].effect.outline.width /
          1000
        ).toFixed(3)}em 0em ${
          data.display.element[data.display.key].layer[n].effect.outline.color
        }) `;
        stroke += `drop-shadow(${posPointer.outline[k].x}${(
          data.display.element[data.display.key].layer[n].effect.stroke.width /
          1000
        ).toFixed(3)}em ${posPointer.outline[k].y}${(
          data.display.element[data.display.key].layer[n].effect.stroke.width /
          1000
        ).toFixed(3)}em 0em ${
          data.display.element[data.display.key].layer[n].effect.stroke.color
        }) `;
      }

      for (
        var l = 0;
        l <= data.display.element[data.display.key].layer[n].effect.depth.width;
        l++
      ) {
        if (l == 0) {
          depth += `drop-shadow(${
            posPointer.depth[
              data.display.element[data.display.key].layer[n].effect.depth.type
            ].x *
            l *
            0.01
          }em ${
            posPointer.depth[
              data.display.element[data.display.key].layer[n].effect.depth.type
            ].y *
            l *
            0.01
          }em 1px ${
            data.display.element[data.display.key].layer[n].effect.depth.color
          })`;
        }
        depth += `drop-shadow(${
          posPointer.depth[
            data.display.element[data.display.key].layer[n].effect.depth.type
          ].x *
          l *
          0.01
        }em ${
          posPointer.depth[
            data.display.element[data.display.key].layer[n].effect.depth.type
          ].y *
          l *
          0.01
        }em 0em ${
          data.display.element[data.display.key].layer[n].effect.depth.color
        })`;
      }
      outline = `${
        data.display.element[data.display.key].layer[n].effect.outline.width !=
        0
          ? outline
          : ""
      }`;
      stroke = `${
        data.display.element[data.display.key].layer[n].effect.stroke.width != 0
          ? stroke
          : ""
      }`;
      depth = `${
        data.display.element[data.display.key].layer[n].effect.depth.width != 0
          ? depth
          : ""
      }`;

      $(`.jd-canvas-element-layer[data-canvas-element-layer="${n}"]`).attr(
        "style",
        ""
      );
      if (
        $(`.jd-canvas-element-layer[data-canvas-element-layer="${n}"]`).attr(
          "data-canvas-element-type"
        ) == "text"
      ) {
        let fontid = `font-${String(
          data.display.element[data.display.key].layer[n].font.family
        ).replace(/[^0-9a-zA-Z]/gi, "")}`;
        if ($(`#${fontid}`).length == 0) {
          $("head").append(
            `<link id="${fontid}" href="${
              data.display.element[data.display.key].layer[n].font.source
            }" rel="stylesheet">`
          );
        }

        let css = {
          textStroke: `${(
            data.display.element[data.display.key].layer[n].effect.stroke
              .width / 1000
          ).toFixed(3)}em ${
            data.display.element[data.display.key].layer[n].effect.stroke.color
          }`,
          textAlign: `${
            data.display.element[data.display.key].layer[n].text.align
          }`,
          fontFamily: `${
            data.display.element[data.display.key].layer[n].font.family
          }`,
          fontWeight: `${
            data.display.element[data.display.key].layer[n].text.bold
              ? "bold"
              : "normal"
          }`,
          fontStyle: `${
            data.display.element[data.display.key].layer[n].text.italic
              ? "italic"
              : "normal"
          }`,
          fontSize: `${
            data.display.element[data.display.key].layer[n].size.fontsize
          }px`,
          letterSpacing: `${(
            data.display.element[data.display.key].layer[n].size.letterspacing /
            100
          ).toFixed(2)}em`,
          lineHeight: `${(
            data.display.element[data.display.key].layer[n].size.lineheight /
            100
          ).toFixed(2)}em`,
          top: `${
            data.display.element[data.display.key].layer[n].position.top
          }px`,
          left: `${
            data.display.element[data.display.key].layer[n].position.left
          }px`,
          transform: `rotate(${
            data.display.element[data.display.key].layer[n].transform.rotate
          }deg) skew(${
            data.display.element[data.display.key].layer[n].transform.skew
          }deg) scaleX(${
            data.display.element[data.display.key].layer[n].transform.flip
              .vertical
              ? "-1"
              : "1"
          }) scaleY(${
            data.display.element[data.display.key].layer[n].transform.flip
              .horizontal
              ? "-1"
              : "1"
          })`,
          filter: `opacity(${(
            data.display.element[data.display.key].layer[n].color.opacity / 100
          ).toFixed(2)}) ${outline} ${depth} ${shadow}`,
        };
        $(`.jd-canvas-element-layer[data-canvas-element-layer="${n}"]`).html(
          String(
            decodeURIComponent(
              data.display.element[data.display.key].layer[n].text.write
            )
          )
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/\n/g, "<br>")
        );
        if (
          data.display.element[data.display.key].layer[n].effect.curve.type == 0
        ) {
          $(`.jd-canvas-element-layer[data-canvas-element-layer="${n}"]`)
            .addClass("jd-canvas-element-text")
            .css(css)
            .css({
              borderBottom: `${
                data.display.element[data.display.key].layer[n].text.underline
                  ? `0.1em solid ${
                      data.display.element[data.display.key].layer[n].color
                        .background.main[
                        data.display.element[data.display.key].layer[n].color
                          .background.main.length - 1
                      ]
                    }`
                  : "none"
              }`,
              backgroundImage: `${color}`,
            });
        } else {
          let wt = JSON.stringify(
            decodeURIComponent(
              data.display.element[data.display.key].layer[n].text.write
            ).split("")
          );
          let wa = JSON.parse(`${wt}`)
            .splice(
              0,
              JSON.parse(`${wt}`).length % 2 == 1
                ? JSON.parse(`${wt}`).length / 2 - 0.5
                : JSON.parse(`${wt}`).length / 2
            )
            .reverse();
          let wm =
            JSON.parse(`${wt}`).length % 2 == 1
              ? JSON.parse(`${wt}`)[JSON.parse(`${wt}`).length / 2 - 0.5]
              : "";
          let wb = JSON.parse(`${wt}`).splice(
            JSON.parse(`${wt}`).length % 2 == 1
              ? JSON.parse(`${wt}`).length / 2 + 0.5
              : JSON.parse(`${wt}`).length / 2,
            JSON.parse(`${wt}`).length - 1
          );
          let addcss = {
            position: `absolute`,
            width: `${css.fontSize}`,
            height: `${css.fontSize}`,
            lineHeight: `1em`,
          };
          let ct =
            data.display.element[data.display.key].layer[n].effect.curve.type -
            1;
          let cr =
            data.display.element[data.display.key].layer[n].effect.curve.round;
          let cd =
            data.display.element[data.display.key].layer[n].effect.curve.degree;
          let c = [
            {
              ra: "-",
              rb: "",
              ta: "bottom",
              tb: "top",
              rta: "",
              rtb: "-",
            },
            {
              ra: "",
              rb: "-",
              ta: "top",
              tb: "bottom",
              rta: "-",
              rtb: "",
            },
            {
              ra: "-",
              rb: "",
              ta: "bottom",
              tb: "top",
              rta: "",
              rtb: "-",
            },
            {
              ra: "",
              rb: "-",
              ta: "top",
              tb: "bottom",
              rta: "-",
              rtb: "",
            },
          ];
          let d =
            JSON.parse(`${wt}`).length % 2 == 1
              ? cd / wa.length
              : (cd * 2) / (wa.length * 2 - 1);
          let str = ``;
          $.each(wa, function (i, v) {
            str += `
						<div style="transform: rotate(${c[ct].ra}${
              JSON.parse(`${wt}`).length % 2 == 1
                ? (i + 1) * d
                : (i + 1) * d - d / 2
            }deg)">
							<div>
								<div style="transform: rotate(${c[ct].rta}${
              ct == 2 || ct == 3
                ? JSON.parse(`${wt}`).length % 2 == 1
                  ? (i + 1) * d
                  : (i + 1) * d - d / 2
                : "0"
            }deg)">
									<div>${wa[i]}</div>
							</div>
						</div>
					</div>`;
          });
          str += `
						<div style="transform: rotate(0deg)">
							<div>
								<div style="transform: rotate(0deg)">
									<div>${wm}</div>
							</div>
						</div>
					</div>`;
          $.each(wb, function (i, v) {
            str += `
						<div style="transform: rotate(${c[ct].rb}${
              JSON.parse(`${wt}`).length % 2 == 1
                ? (i + 1) * d
                : (i + 1) * d - d / 2
            }deg)">
							<div>
								<div style="transform: rotate(${c[ct].rtb}${
              ct == 2 || ct == 3
                ? JSON.parse(`${wt}`).length % 2 == 1
                  ? (i + 1) * d
                  : (i + 1) * d - d / 2
                : "0"
            }deg)">
									<div>${wb[i]}</div>
							</div>
						</div>
					</div>`;
          });
          $(`.jd-canvas-element-layer[data-canvas-element-layer="${n}"]`)
            .removeClass("jd-canvas-element-text")
            .css(css)
            .css(addcss)
            .html(str);
          $(
            `.jd-canvas-element-layer[data-canvas-element-layer="${n}"] > div`
          ).css(addcss);
          $(
            `.jd-canvas-element-layer[data-canvas-element-layer="${n}"] > div > div`
          )
            .css(addcss)
            .css({
              height: `${Number(cr / 100).toFixed(3)}em`,
            })
            .css(c[ct].ta, "0px");
          $(
            `.jd-canvas-element-layer[data-canvas-element-layer="${n}"] > div > div > div`
          )
            .css(addcss)
            .css(c[ct].tb, "0px");
          $(
            `.jd-canvas-element-layer[data-canvas-element-layer="${n}"] > div > div > div > div`
          ).css({
            whiteSpace: `nowrap`,
            webkitBackgroundClip: `text`,
            webkitTextFillColor: `transparent`,
            backgroundClip: `text`,
            color: `transparent`,
            backgroundImage: `${color}`,
            paddingBottom: "0.5em",
            textAlign: "center",
          });
        }
      } else {
        let css = {
          backgroundImage: `url('${
            data.display.element[data.display.key].layer[n].src
          }') ${
            data.display.element[data.display.key].layer[n].color.background
              .type == "none"
              ? ""
              : `, ${color}`
          }`,
          top: `${
            data.display.element[data.display.key].layer[n].position.top
          }px`,
          left: `${
            data.display.element[data.display.key].layer[n].position.left
          }px`,
          fontSize: `${
            data.display.element[data.display.key].layer[n].dimension.width
          }px`,
          width: `${
            data.display.element[data.display.key].layer[n].dimension.width
          }px`,
          height: `${
            data.display.element[data.display.key].layer[n].dimension.natural
              ? `${
                  (data.display.element[data.display.key].layer[n].dimension
                    .width *
                    data.display.element[data.display.key].layer[n].dimension
                      .naturalheight) /
                  data.display.element[data.display.key].layer[n].dimension
                    .naturalwidth
                }`
              : `${
                  data.display.element[data.display.key].layer[n].dimension
                    .height
                }`
          }px`,
          transform: `rotate(${
            data.display.element[data.display.key].layer[n].transform.rotate
          }deg) skew(${
            data.display.element[data.display.key].layer[n].transform.skew
          }deg) scaleX(${
            data.display.element[data.display.key].layer[n].transform.flip
              .vertical
              ? "-1"
              : "1"
          }) scaleY(${
            data.display.element[data.display.key].layer[n].transform.flip
              .horizontal
              ? "-1"
              : "1"
          })`,
          filter: `${
            data.display.element[data.display.key].layer[n].color.edit.mode
              ? `opacity(0.9) grayscale(100%) drop-shadow(0em 0em 0em ${
                  data.display.element[data.display.key].layer[n].color.edit
                    .main
                }) saturate(100)`
              : ``
          } opacity(${(
            data.display.element[data.display.key].layer[n].color.opacity / 100
          ).toFixed(2)}) ${
            data.display.element[data.display.key].layer[n].color.filter
          } ${stroke} ${outline} ${depth} ${shadow}`,
          borderRadius: `${
            data.display.element[data.display.key].layer[n].round.top.left
          }% ${
            data.display.element[data.display.key].layer[n].round.top.right
          }% ${
            data.display.element[data.display.key].layer[n].round.bottom.left
          }% ${
            data.display.element[data.display.key].layer[n].round.bottom.right
          }%`,
        };
        $(`.jd-canvas-element-layer[data-canvas-element-layer="${n}"]`).css(
          css
        );

        /* ((imgSrc) => {
    var newImg = new Image();

    newImg.onload = function() {
      var height = newImg.height;
      var width = newImg.width;
      alert ('The image size is '+width+'*'+height);
    }

    newImg.src = imgSrc; // this must be done AFTER setting onload
})(data.display.element[data.display.key].layer[n].src); */
      }
    },
    input: (i = null, v = null) => {
      if (i != null && v != null) {
        $.each(input, function (index, value) {
          if (value.pointer == i) {
            try {
              input[index].event(v);
            } catch {}
          }
        });
      } else {
        $.each(input, function (index, value) {
          try {
            input[index].event();
          } catch {}
        });
      }
    },
    all: () => {
      render.color();
      render.position();
      render.element();
      render.input();
    },
  };

  let createCanvas = (() => {
    $(`[data-jd-class="canvas"]`).attr("id", "jd-main").html(`
			<div id="jd-image" style="display: none"></div>
          <div id="jd-canvas">
            <div id="jd-canvas-color" class="jd-canvas"></div>
            <div id="jd-canvas-element" class="jd-canvas"></div>
            <div id="jd-canvas-bottom" class="jd-canvas" style="mix-blend-mode: multiply;"></div>
            <div id="jd-canvas-top" class="jd-canvas"></div>
          </div>
			`);
    let canvaswidth = $("#jd-main").width();
    $("#jd-canvas").css({
      transform: `scale(${canvaswidth / 1000})`,
      top: `${
        Number(canvaswidth / 1000) <= 1
          ? "-" + Number((1 - Number(canvaswidth / 1000)) / 2)
          : Number((1 - Number(canvaswidth / 1000)) / 2) * -1
      }em`,
      left: `${
        Number(canvaswidth / 1000) <= 1
          ? "-" + Number((1 - Number(canvaswidth / 1000)) / 2)
          : Number((1 - Number(canvaswidth / 1000)) / 2) * -1
      }em`,
    });
    $(`[data-jd-class="action"]`).css("display", "none");
    $(`[data-jd-class="action"]`).first().css("display", "block");
    render.all();
  })();

  (() => {
    let c = document.querySelectorAll(`[data-jd-class="colorwheel"]`);
    $.each(c, function (index, value) {
      new ReinventedColorWheel({
        appendTo: c[index],
        hex: "#ff0000",
        wheelDiameter: 200,
        wheelThickness: 20,
        handleDiameter: 16,
        wheelReflectsSaturation: true,
        onChange: function (color) {
          c[index].setAttribute("data-jd-value", `${color.hex}`);
          let i = c[index].getAttribute("data-jd-pointer");
          let v = c[index].getAttribute("data-jd-value");
          render.input(i, v);
        },
      });
    });
  })();
  (() => {
    $(document).on(`change`, '[data-jd-class="input-change"]', function () {
      this.setAttribute("data-jd-value", this.value);
      let i = this.getAttribute("data-jd-pointer");
      let v = this.getAttribute("data-jd-value");
      render.input(i, v);
    });
  })();
  (() => {
    $(document).on(`input`, '[data-jd-class="input-input"]', function () {
      this.setAttribute("data-jd-value", this.value);
      if (this.type == "checkbox") {
        this.setAttribute("data-jd-value", this.checked);
      }

      let i = this.getAttribute("data-jd-pointer");
      let v = this.getAttribute("data-jd-value");

      render.input(i, v);
    });
  })();
  (() => {
    $(document).on(`click`, '[data-jd-class="input-click"]', function () {
      let i = this.getAttribute("data-jd-pointer");
      let v = this.getAttribute("data-jd-value");
      render.input(i, v);
    });
  })();
  (() => {
    $(document).on("change", ".custom-file-input", function () {
      var fileName = $(this).val().split("\\").pop();
      $(this)
        .siblings(".custom-file-label")
        .addClass("selected")
        .html(fileName);
    });
  })();
};
