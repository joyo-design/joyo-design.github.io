let jdesign = function (newdata = null) {

  const jd = {
    object:(v=null,w=null,x=null)=>{
      return $(`${(v!=null)?`[data-jd-class="${v}"]`:``}${(w!=null)?`[data-jd-pointer="${w}"]`:``}${(x!=null)?`[data-jd-value="${x}"]`:``}`);
    },
    class:(v)=>{
      return $(`[data-jd-class="${v}"]`);
    },
    pointer:(v)=>{
      return $(`[data-jd-pointer="${v}"]`);
    },
    layer:(v)=>{
      return $(`.jd-canvas-element-layer[data-jd-element-layer="${v}"]`)
    }
  }

  const variable = {
    layer: -1,
    printable: false,
    action: {
      active: ``,
      temporary: ``
    },
    unredo: {
      key: -1,
      data: []
    },
    template:{
      elementlayerlist: `<button type="button" class="list-group-item list-group-item-action">{name}</button>`,
      textfontlist: `<button type="button" class="list-group-item list-group-item-action">{preview}</button>`,
      imageselectpixabaylist: `<img src="{preview}" class="img-thumbnail" style="max-width: 200px">`,
      imageselectrecentlist: `<img src="{preview}" class="img-thumbnail" style="max-width: 200px">`,
    },
    imgbb:{
      key: `3c71f86b78055de0ff6250ddf4432610`
    },
    jsonbin:{
      key: `$2b$10$oxu103sQk/NMxfBlFGRGx.Ltvt2GPgaTKW52z5UtqZS5TuJ4gLwRS`
    },
    pixabay:{
      key: `17676215-53bfed5faba6b1cf924d69224`,
      page: 1,
      keyword: ``,
      type: `all`,
      color: ``,
    },
    font:{
      key: `AIzaSyBImIzEJ2_-zqy04pkDd86PX5ADDIZXQ3g`,
      page: 1,
      sort: `trending`,
      category: ``,
      language: ``,
      keyword: ``,
      items: []
    },
    capture: {
      status: false,
      mockup: {
        url: [],
        data:[]
      },
      raw: {
        url: [],
        data:[]
      }
    },
    imagerecent:{
      page: 1,
      items: []
    },
    data: JSON.parse(`{"product":{"id":"1","name":"Tshirt lengan pendek","category":"Tshirt","color":{"main":"#fefefe","recommendation":["#ff0000","#00ff00","#0000ff"]}},"display":{"key":0,"position":[{"available":true,"image":{"bottom":"https://i.ibb.co/Q8QsZPf/tshirt-depan-min.jpg","top":"https://i.ibb.co/B3R5gbF/tshirt-depan.png"},"printable":{"top":"200","left":"310","width":"400","height":"500"}},{"available":false,"image":{"bottom":"","top":""},"printable":{"top":"65","left":"95","width":"140","height":"212"}},{"available":false,"image":{"bottom":"","top":""},"printable":{"top":"65","left":"95","width":"140","height":"212"}},{"available":false,"image":{"bottom":"","top":""},"printable":{"top":"65","left":"95","width":"140","height":"212"}},{"available":true,"image":{"bottom":"https://i.ibb.co/ZhQ9DmM/tshirt-belakang-min.jpg","top":"https://i.ibb.co/47P3zWX/tshirt-belakang.png"},"printable":{"top":"65","left":"95","width":"140","height":"212"}}],"element":[{"layer":[]},{"layer":[]},{"layer":[]},{"layer":[]},{"layer":[]}]}}`),
    raw:{
      text: JSON.parse(`{"type":"text","text":{"write":"Text","align":"center","bold":false,"underline":false,"italic":false},"font":{"family":"","source":""},"size":{"fontsize":75,"letterspacing":0,"lineheight":100},"position":{"top":350,"left":372},"transform":{"rotate":0,"skew":0,"flip":{"vertical":false,"horizontal":false}},"color":{"background":{"type":"normal","main":["#000000"],"poslinear":0,"posradialx":50,"posradialy":50},"opacity":"100"},"effect":{"stroke":{"width":0,"color":"#000000"},"depth":{"type":0,"width":0,"color":"#000000"},"curve":{"type":0,"round":300, "degree": 75},"outline":{"width":0,"color":"#000000"}},"shadow":{"blur":0,"color":"#000000","posx":0,"posy":0}}`),
      image: JSON.parse(`{"type":"image","src":"","position":{"top":500,"left":372},"dimension":{"natural":true,"width":200,"height":200,"naturalwidth":960,"naturalheight":960},"color":{"edit":{"mode":false,"main":"#ff0000"},"background":{"type":"none","main":["#ff0000"],"poslinear":0,"posradialx":50,"posradialy":50},"filter":"","opacity":"100"},"transform":{"rotate":0,"skew":0,"flip":{"vertical":false,"horizontal":false}},"effect":{"stroke":{"width":0,"color":"#000000"},"depth":{"type":0,"width":0,"color":"#000000"},"outline":{"width":0,"color":"#000000"}},"shadow":{"blur":"0","color":"#000000","posx":0,"posy":0}, "round":{"top":{"left":0,"right":0}, "bottom":{"left":0,"right":0}}}`),
    },
    canvas: {
      width: jd.class(`main`).width(),
      html: `<div id="jd-wrap"><div id="jd-canvas"><div id="jd-canvas-color" class="jd-canvas"></div><div id="jd-canvas-element" class="jd-canvas"></div><div id="jd-canvas-bottom" class="jd-canvas" style="mix-blend-mode: multiply;"></div><div id="jd-canvas-top" class="jd-canvas"></div><div id="jd-printable"></div></div></div>`,
      mode: `mockup`
    }
  }

  const method = {
    unredo:(v)=>{
      if(JSON.stringify(variable.unredo.data[variable.unredo.key]) != JSON.stringify(v)){
        variable.unredo.key += 1;
        variable.unredo.data.splice(variable.unredo.key, variable.unredo.data.length-variable.unredo.key);
        let od = JSON.stringify(variable.unredo.data);
        od = (variable.unredo.data.length == 0)?od.substring(0, od.length - 1):od.substring(0, od.length - 1)+",";
        nd = od+JSON.stringify(v)+"]";
        variable.unredo.data = JSON.parse(`${nd}`);
      }
      input.render(`unredo`);
    },
    layermove: (arr, old_index, new_index) => {
      if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
              arr.push(undefined);
          }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    },
    inputcolor:(v)=>{
      return v.substring(0, 7);
    },
    colorinvert: (hex) => {
      try{
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const r = Number(parseInt(result[1], 16)) <= 127.5 ? "ff" : "00";
        const g = Number(parseInt(result[2], 16)) <= 127.5 ? "ff" : "00";
        const b = Number(parseInt(result[3], 16)) <= 127.5 ? "ff" : "00";
        return `#${r}${g}${b}`;
      }
      catch{
        return false;
      }
      
    },
    font:(family, source)=>{
      let fontid = `font-${String(family).replace(/[^0-9a-zA-Z]/gi, "")}`;
        if ($(`#${fontid}`).length == 0) {
          $("head").append(
            `<link id="${fontid}" href="${source}" rel="stylesheet">`
          );
        }
    },
    imagerecent(v = null){
      if(v == null){
        let items = window.localStorage.getItem(`jd-imagerecent`);
        if (items== null) {
          items = `[]`;
        }
        return JSON.parse(items);
      }
      else{
        let items = window.localStorage.getItem(`jd-imagerecent`);
        if (items== null) {
          items = `[]`;
        }
        let itemsdata = JSON.parse(items);
        let isincludes = itemsdata.includes(v);
        if(!isincludes){
          itemsdata.push(v);
        }
        else{
          method.layermove(itemsdata, itemsdata.indexOf(v), itemsdata.length-1);
        }
        window.localStorage.setItem(`jd-imagerecent`, JSON.stringify(itemsdata));
      }
    },
    inputvalue:(v, mn, mx)=>{
      v = Number(v);
      v = v <= mn ? mn : v;
      v = v >= mx ? mx : v;
      return v;
    },
    capture:()=>{
      $.each(variable.capture.mockup.url, (i, v)=>{
        const settings = {
          url: `https://api.imgbb.com/1/upload?key=${variable.imgbb.key}&image=${encodeURIComponent(`https://shot.screenshotapi.net/screenshot?&url=${encodeURIComponent(v)}&output=image&file_type=png&wait_for_event=load`)}`,
          method: "GET",
          timeout: 0,
          processData: false,
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      });
      $.each(variable.capture.raw.url, (i, v)=>{
        const settings = {
          url: `https://api.imgbb.com/1/upload?key=${variable.imgbb.key}&image=${encodeURIComponent(`https://shot.screenshotapi.net/screenshot?&url=${encodeURIComponent(v)}&output=image&file_type=png&wait_for_event=load`)}`,
          method: "GET",
          timeout: 0,
          processData: false,
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      });
    },
    inputrender:(pointer,value, mn=null, mx=null)=>{
      
      $.each(jd.pointer(pointer), (i, v)=>{
        const type = jd.pointer(pointer).eq(i).attr('type');
        switch(type){
          case `text`:
            jd.pointer(pointer).eq(i).val(value);
            break;
          case `checkbox`:
            jd.pointer(pointer).eq(i).prop("checked",value);
            break;
          case `number`:
            jd.pointer(pointer).eq(i).val(value);
            break;
          case `range`:
            jd.pointer(pointer).eq(i).val(value).attr({min:mn,max:mx});
            break;
          default:
            jd.pointer(pointer).eq(i).val(value);
            jd.pointer(pointer).eq(i).attr("data-jd-value",value);
            break;
        }
      });
    }
  }

  let data =  (newdata!=null)?newdata:variable.data;

  const event = [
    {
      pointer: "action",
      value:(v)=>{
        variable.action.active = v;
        canvas.render();
        input.render();
      },
      render:()=>{
        jd.class(`action`).css({display: `none`});
        jd.object(`action`, null, variable.action.active).css({display:`initial`});
      }
    },

    {
      pointer: "element-add",
      value:(v)=>{
        let dataold = JSON.stringify(data.display.element[data.display.key].layer);
        dataold = dataold.substring(0, dataold.length - 1);
        let datanew = "";
        switch (v) {
          case "text":
            datanew =data.display.element[data.display.key].layer.length == 0? JSON.stringify(variable.raw.text): "," + JSON.stringify(variable.raw.text);
            break;
          case "image":
            datanew =data.display.element[data.display.key].layer.length == 0? JSON.stringify(variable.raw.image): "," + JSON.stringify(variable.raw.image);
            break;
          }
          
          data.display.element[data.display.key].layer = JSON.parse(`${dataold + datanew + "]"}`);
          canvas.render();
      },
      render:()=>{
        jd.class(`element-layerlist`).html("");
        let template = variable.template.elementlayerlist;
        $.each(data.display.element[data.display.key].layer, function (i, v) {
          const name = (v.type == "text") ? ((v.text.write == "")?"Text":v.text.write) : ((String(v.src).substring(String(v.src).lastIndexOf('/')+1) == "")?"Image":String(v.src).substring(String(v.src).lastIndexOf('/')+1));
          const html = template.replace(/>/, ` data-jd-class="input-click" data-jd-pointer="element-edit" data-jd-value="${i}">`).replace(/\{name\}/g,`${name}`);
          jd.class(`element-layerlist`).prepend(`${html}`);
        });
      }
    },
    {
      pointer: "element-edit",
      value: (v) => {
        variable.action.temporary = variable.action.active;
        const action = String(jd.class(`element-layerlist`).attr("data-jd-value")).split("|");
        variable.layer = Number(v);
        data.display.element[data.display.key].layer[v].type == "text" ? input.value("action", action[0]): input.value("action", action[1]);
      }
    },
    {
      pointer: "element-layer",
      value: (v) => {
        const dataold = JSON.parse(`${JSON.stringify(data.display.element[data.display.key].layer)}`);
        switch (v) {
          case "up":
            data.display.element[data.display.key].layer = JSON.parse(`${JSON.stringify(method.layermove(dataold, variable.layer, variable.layer+1))}`);
            variable.layer += 1;
            break;
          case "down":
            data.display.element[data.display.key].layer = JSON.parse(`${JSON.stringify(method.layermove(dataold, variable.layer, variable.layer-1))}`);
            variable.layer -= 1;
            break;
          case "copy":
            dataold.push(JSON.parse(`${JSON.stringify(data.display.element[data.display.key].layer[variable.layer])}`));
            data.display.element[data.display.key].layer = JSON.parse(`${JSON.stringify(dataold)}`);
            variable.layer = data.display.element[data.display.key].layer.length-1;
            break;
          case "reset":
            data.display.element[data.display.key].layer[variable.layer] = (data.display.element[data.display.key].layer[variable.layer].type == "text")?JSON.parse(`${JSON.stringify(raw.text)}`):JSON.parse(`${JSON.stringify(raw.image)}`);
            break;
          case "delete":
            dataold.splice(variable.layer, 1);
            data.display.element[data.display.key].layer = JSON.parse(`${JSON.stringify(dataold)}`);
            input.value("action", variable.action.temporary);
            break;
        }
      },
      render:()=>{
        variable.layer == data.display.element[data.display.key].layer.length - 1? jd.object(null, `element-layer`, `up`).css({display: "none",}): jd.object(null, `element-layer`, `up`).css({display: "block",});
        variable.layer == 0? jd.object(null, `element-layer`, `down`).css({display: "none",}): jd.object(null, `element-layer`, `down`).css({display: "block",});
      }
    },
    {
      pointer: "element-import",
      value: (v=null) => {
        const files = document.querySelector(`[data-jd-pointer='element-import']`).files;
        if (files.length <= 0) {
          return false;
        }
        const fr = new FileReader();
        fr.onload = function(e) { 
          const r = e.target.result;
          let od = JSON.stringify(data.display.element[data.display.key].layer);
          od = od.substring(0, od.length - 1);
          let nd =data.display.element[data.display.key].layer.length == 0? String(decodeURIComponent(r)).replace("[", ""): String(decodeURIComponent(r)).replace("[", ",");
          data.display.element[data.display.key].layer = JSON.parse(`${od + nd}`);
          canvas.render();
          input.render();
          method.unredo(data);
        }
        fr.readAsText(files.item(0));
        $(`[data-jd-pointer='element-import']`).val(null);
      }
    },
    {
      pointer: "element-export",
      value: (v=null) => {
        const filename = 'element.json';
        const jsonStr = JSON.stringify(data.display.element[data.display.key].layer);
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    },
    {
      pointer: "element-delete",
      value: (v) => {
        data.display.element[data.display.key].layer = [];
        canvas.render();
        input.render();
      },
    },
    {
      pointer: "unredo",
      value:(v)=>{
        switch(v){
          case 'undo':
          variable.unredo.key -= 1;
          data = JSON.parse(`${JSON.stringify(variable.unredo.data[variable.unredo.key])}`);
          break;
          case 'redo':
          variable.unredo.key += 1;
          data = JSON.parse(`${JSON.stringify(variable.unredo.data[variable.unredo.key])}`);
          break;
        }
        canvas.render();
        input.render();
      },
      render:()=>{
        (variable.unredo.key <= 0)?jd.object(null, `unredo`, `undo`).css({display: `none`}):jd.object(null, `unredo`, `undo`).css({display :`initial`});
        (variable.unredo.key == variable.unredo.data.length-1)?jd.object(null, `unredo`, `redo`).css({display: `none`}):jd.object(null, `unredo`, `redo`).css({display :`initial`});
      }
    },
    {
      pointer: "product",
      value: (v = null) => {
        const d = JSON.parse(decodeURIComponent(v));
        const e = `${JSON.stringify(data.display.element[data.display.key].layer)}`;
        data.product = JSON.parse(`${JSON.stringify(d.product)}`);
        data.display.key = d.display.key;
        data.display.position = JSON.parse(`${JSON.stringify(d.display.position)}`);
        $.each(data.display.element, function(i, v){
          data.display.element[i].layer = [];
        });
        data.display.element[data.display.key].layer = JSON.parse(`${e}`);
        canvas.render();
        input.render();
        
      },
    },
    {
      pointer: "template",
      value: (v = null) => {
        if (v != null) {
          let od = JSON.stringify(data.display.element[data.display.key].layer);
          od = od.substring(0, od.length - 1);
          let nd =data.display.element[data.display.key].layer.length == 0? String(decodeURIComponent(v)).replace("[", ""): String(decodeURIComponent(v)).replace("[", ",");
          data.display.element[data.display.key].layer = JSON.parse(`${ od + nd}`);
          canvas.render();
          input.render();
        }
      },
    },
    {
      pointer: "color",
      value:(v)=>{
        data.product.color.main = method.inputcolor(v);
        canvas.color();
        canvas.printable();
      },
      render:()=>{
        method.inputrender(`color`, data.product.color.main);
        jd.class(`color-recommendation`).html("");
        $.each(data.product.color.recommendation, function (i, v) {
          jd.class(`color-recommendation`).append(`<button type="button" class="jd-color-recommendation" data-jd-class="input-click" data-jd-pointer="color" data-jd-value="${data.product.color.recommendation[i]}" style="background-color: ${data.product.color.recommendation[i]}">&nbsp;</button>`);
        });
      }
    },
    {
      pointer: "position",
      value: (v) => {
        data.display.key = Number(v);
        canvas.render();
        input.render();
      },
      render:()=>{
        $.each(data.display.position, function(i, v){
          if (data.display.position[i].available) {
            jd.object(null, `position`, `${i}`).css("display", "initial");
          }
          else{
            jd.object(null, `position`, `${i}`).css("display", "none");
          }
        });
      }
    },
    {
      pointer: "printable",
      value: (v = null) => {
        variable.printable = (variable.printable)?false:true;
        canvas.printable();
      }
    },
    {
      pointer: "mode",
      value: (v) => {
        variable.canvas.mode = v;
        canvas.mode();
      }
    },
    {
      pointer: "text-textwrite",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].text.write = v;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-textwrite`, data.display.element[data.display.key].layer[variable.layer].text.write);
      }
    },
    {
      pointer: "text-style",
      value: (v) => {
          let style = JSON.parse(decodeURIComponent(v));
          style.text.write = data.display.element[data.display.key].layer[variable.layer].text.write;
          style.position = data.display.element[data.display.key].layer[variable.layer].position;
          data.display.element[data.display.key].layer[variable.layer] = JSON.parse(JSON.stringify(`${s}`));
          canvas.layer(variable.layer);
      },
    },
    {
      pointer: "text-font",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].font = JSON.parse(decodeURIComponent(v));
        canvas.layer(variable.layer);
      },
    },
    {
      pointer: "text-fontsort",
      value: (v) => {
        variable.font.sort = encodeURIComponent(v);
      }
    },
    {
      pointer: "text-fontcategory",
      value: (v) => {
        variable.font.category = encodeURIComponent(v);
      }
    },
    {
      pointer: "text-fontlanguage",
      value: (v) => {
        variable.font.language = encodeURIComponent(v);
      }
    },
    {
      pointer: "text-fontkeyword",
      value: (v) => {
        variable.font.keyword = encodeURIComponent(v);
      }
    },
    {
      pointer: "text-fontsearch",
      value: (v = null) => {
        variable.font.page = 1;
        const settings = {
          url: `https://www.googleapis.com/webfonts/v1/webfonts?key=${variable.font.key}&sort=${variable.font.sort}`,
          method: "GET",
          timeout: 0,
          processData: false,
          contentType: false,
        };

        $.ajax(settings).done(function (response) {
          let items = '';
          $.each(response.items, function(i, v){
            if(String(response.items[i].family).toLowerCase().includes(String(variable.font.keyword).toLowerCase()) && ((variable.font.language.length == 0)?true:(response.items[i].subsets).includes(variable.font.language)) && ((variable.font.category.length == 0)?true:(response.items[i].category).includes(variable.font.category))){
              items += `{"family": "'${response.items[i].family}', ${(response.items[i].category == 'handwriting' || response.items[i].category == 'display')?'cursive':response.items[i].category}", "source": "https://fonts.googleapis.com/css?family=${String(response.items[i].family).replace(' ', '+')}&display=swap"},`;  
            }            
          });
          variable.font.items = JSON.parse(`[${items.substring(0, items.length - 1)}]`);
          jd.class(`text-fontlist`).html(``);
          let template = variable.template.textfontlist;
          for (var i = 0; i < ((variable.font.items.length > 20)?20:variable.font.items.length); i++) {
            method.font(variable.font.items[i].family, variable.font.items[i].source);
            const preview = `<span style="font-family: ${variable.font.items[i].family}">${data.display.element[data.display.key].layer[variable.layer].text.write}</span>`;
            const html = template.replace(/>/, ` data-jd-class="input-click" data-jd-pointer="text-font" data-jd-value="${encodeURIComponent(JSON.stringify(variable.font.items[i]))}">`).replace(/\{preview\}/g,`${preview}`);
            jd.class(`text-fontlist`).append(html);
            (i==19)?jd.pointer(`text-fontnext`).css({display: `initial`}):jd.pointer(`text-fontnext`).css({display: `none`});
          }
        });  
      },
    },
    {
      pointer: "text-fontnext",
      value: (v = null) => {
        variable.font.page += 1;
        let template = variable.template.textfontlist;
        for (let i = ((variable.font.page-1)*20); i < ((variable.font.page)*20); i++) {
          method.font(variable.font.items[i].family, variable.font.items[i].source);
          const preview = `<span style="font-family: ${variable.font.items[i].family}">${data.display.element[data.display.key].layer[variable.layer].text.write}</span>`;
          const html = template.replace(/>/, ` data-jd-class="input-click" data-jd-pointer="text-font" data-jd-value="${encodeURIComponent(JSON.stringify(variable.font.items[i]))}">`).replace(/\{preview\}/g,`${preview}`);
          jd.class(`text-fontlist`).append(html);
          (i==((variable.font.page)*20)-1)?jd.pointer(`text-fontnext`).css({display: `initial`}):jd.pointer(`text-fontnext`).css({display: `none`});
        }
      },
    },
    {
      pointer: "text-textalign",
      value: (v) => {
        if (v != null) {
          data.display.element[data.display.key].layer[variable.layer].text.align = v;
          canvas.layer(variable.layer);
        }
        
      },
      render:()=>{
        method.inputrender(`text-textalign`, data.display.element[data.display.key].layer[variable.layer].text.align);
      }
    },
    {
      pointer: "text-textbold",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].text.bold = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-textbold`, data.display.element[data.display.key].layer[variable.layer].text.bold);
      }
    },
    {
      pointer: "text-textitalic",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].text.italic = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-textitalic`, data.display.element[data.display.key].layer[variable.layer].text.italic);
      }
    },
    {
      pointer: "text-textunderline",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].text.underline = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-textunderline`, data.display.element[data.display.key].layer[variable.layer].text.underline);
      }
    },
    {
      pointer: "text-positionx",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].position.left = method.inputvalue(v, -200, 1000);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-positionx`, data.display.element[data.display.key].layer[variable.layer].position.left, -200, 1000);
      }
    },
    {
      pointer: "text-positiony",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].position.top = method.inputvalue(v, -200, 1000);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-positiony`, data.display.element[data.display.key].layer[variable.layer].position.top, -200, 1000);
      }
    },
    {
      pointer: "text-sizefontsize",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].size.fontsize = method.inputvalue(v, 0, 1000);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-sizefontsize`, data.display.element[data.display.key].layer[variable.layer].size.fontsize, 0, 1000)
      }
    },
    {
      pointer: "text-sizeletterspacing",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].size.letterspacing = method.inputvalue(v, -10, 200);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-sizeletterspacing`, data.display.element[data.display.key].layer[variable.layer].size.letterspacing, -10, 200);
      }
    },
    {
      pointer: "text-sizelineheight",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].size.lineheight = method.inputvalue(v, 100, 300);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-sizelineheight`, data.display.element[data.display.key].layer[variable.layer].size.lineheight, 100, 300);
      }
    },
    {
      pointer: "text-colortype",
      value: (v) => {
          data.display.element[data.display.key].layer[variable.layer].color.background.type = v;
          if (data.display.element[data.display.key].layer[variable.layer].color.background.type == "normal" ||data.display.element[data.display.key].layer[variable.layer].color.background.type == "same-parent") {
            data.display.element[data.display.key].layer[variable.layer].color.background.main = [data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1]];
          }
          canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-colortype`, data.display.element[data.display.key].layer[variable.layer].color.background.type)
        data.display.element[data.display.key].layer[variable.layer].color.background.type != "normal" &&data.display.element[data.display.key].layer[variable.layer].color.background.type != "same-parent"? jd.pointer(`text-coloradd`).css({display: "block",}): jd.pointer(`text-coloradd`).css({ display: "none",});
        data.display.element[data.display.key].layer[variable.layer].color.background.type == "linear-gradient"? jd.pointer(`text-colorposlinear`).css({display: "block",}): jd.pointer(`text-colorposlinear`).css({display: "none",});
        data.display.element[data.display.key].layer[variable.layer].color.background.type == "radial-gradient"? $(`[data-jd-pointer='text-colorposrasialx'], [data-jd-pointer='text-colorposrasialy']`).css({display: "block",}): $(`[data-jd-pointer='text-colorposrasialx'], [data-jd-pointer='text-colorposrasialy']`).css({display: "none",});
      }
    },
    {
      pointer: "text-color",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1] = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-color`, data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1])
      }
    },
    {
      pointer: "text-coloradd",
      value: (v = null) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.main.push(method.colorinvert(data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1]));
        canvas.layer(variable.layer);
      }
    },
    {
      pointer: "text-coloropacity",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.opacity = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-coloropacity`, data.display.element[data.display.key].layer[variable.layer].color.opacity, 0, 100);
      }
    },
    {
      pointer: "text-colorposlinear",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.poslinear = method.inputvalue(v, -180, 180);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-colorposlinear`, data.display.element[data.display.key].layer[variable.layer].color.background.poslinear, -180, 180);
      }
    },
    {
      pointer: "text-colorposrasialx",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.posradialx = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-colorposrasialx`, data.display.element[data.display.key].layer[variable.layer].color.background.posradialx, 0, 100);
      }
    },
    {
      pointer: "text-colorposrasialy",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.posradialy = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-colorposrasialy`, data.display.element[data.display.key].layer[variable.layer].color.background.posradialy, 0, 100);
      }
    },
    {
      pointer: "text-transformrotate",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.rotate = method.inputvalue(v, -180, 180);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-transformrotate`, data.display.element[data.display.key].layer[variable.layer].transform.rotate, -180, 180);
      }
    },
    {
      pointer: "text-transformskew",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.skew = method.inputvalue(v, -88, 88);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-transformskew`, data.display.element[data.display.key].layer[variable.layer].transform.skew, -88, 88);
      }
    },
    {
      pointer: "text-transformfliphorizontal",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.flip.horizontal = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-transformfliphorizontal`, data.display.element[data.display.key].layer[variable.layer].transform.flip.horizontal);
      }
    },
    {
      pointer: "text-transformflipvertical",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.flip.vertical = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-transformflipvertical`, data.display.element[data.display.key].layer[variable.layer].transform.flip.vertical);
      }
    },
    {
      pointer: "text-effectstrokecolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.stroke.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectstrokecolor`, data.display.element[data.display.key].layer[variable.layer].effect.stroke.color)
      }
    },
    {
      pointer: "text-effectstrokewidth",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.stroke.width = method.inputvalue(v, 0, 35);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectstrokewidth`, data.display.element[data.display.key].layer[variable.layer].effect.stroke.width, 0, 35);
      }
    },
    {
      pointer: "text-effectdepthtype",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.depth.type = Number(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectdepthtype`, data.display.element[data.display.key].layer[variable.layer].effect.depth.type);
      }
    },
    {
      pointer: "text-effectdepthcolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.depth.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectdepthcolor`, data.display.element[data.display.key].layer[variable.layer].effect.depth.color);
      }
    },
    {
      pointer: "text-effectdepthwidth",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.depth.width = method.inputvalue(v, 0, 15);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectdepthwidth`, data.display.element[data.display.key].layer[variable.layer].effect.depth.width, 0, 15);
      }
    },
    {
      pointer: "text-effectoutlinecolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.outline.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectoutlinecolor`, data.display.element[data.display.key].layer[variable.layer].effect.outline.color)
      }
    },
    {
      pointer: "text-effectoutlinewidth",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.outline.width = method.inputvalue(v, 0, 35);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectoutlinewidth`, data.display.element[data.display.key].layer[variable.layer].effect.outline.width, 0, 35);
      }
    },
    {
      pointer: "text-effectcurvetype",
      value: (v) => {
        if (v != null) {
          data.display.element[data.display.key].layer[
            variable.layer
          ].effect.curve.type = v;
          canvas.layer(variable.layer);
        }
        $(`[data-jd-pointer='text-effectcurvetype']`).val(
          data.display.element[data.display.key].layer[variable.layer].effect
            .curve.type
        );
        data.display.element[data.display.key].layer[variable.layer].effect.curve.type = Number(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectcurvetype`, data.display.element[data.display.key].layer[variable.layer].effect.curve.type);
      }
    },
    {
      pointer: "text-effectcurveround",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.curve.round = method.inputvalue(v, 100, 700);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectcurveround`, data.display.element[data.display.key].layer[variable.layer].effect.curve.round, 100, 700);
      }
    },
    {
      pointer: "text-effectcurvedegree",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.curve.degree = method.inputvalue(v, 0, 180);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-effectcurvedegree`, data.display.element[data.display.key].layer[variable.layer].effect.curve.degree, 0, 180);
      }
    },
    {
      pointer: "text-shadowcolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-shadowcolor`, data.display.element[data.display.key].layer[variable.layer].shadow.color);
      }
    },
    {
      pointer: "text-shadowblur",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.blur = method.inputvalue(v, 0, 50);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-shadowblur`, data.display.element[data.display.key].layer[variable.layer].shadow.blur, 0, 50);
      }
    },
    {
      pointer: "text-shadowposx",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.posx = method.inputvalue(v, -350, 350);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-shadowposx`, data.display.element[data.display.key].layer[variable.layer].shadow.posx, -350, 350);
      }
    },
    {
      pointer: "text-shadowposy",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.posy = method.inputvalue(v, -350, 350);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`text-shadowposy`, data.display.element[data.display.key].layer[variable.layer].shadow.posy, -350, 350);
      }
    },
    {
      pointer: "image-selectupload",
      value: (v = null) => {
        jd.layer(variable.layer).css({backgroundImage: ``}).html(`<span style="font-size: 0.1em">Loading...</span>`);
        const file = document.querySelector(`[data-jd-pointer="image-selectupload"]`);
        let form = new FormData();
        form.append("image", file.files[0]);
        const settings = {
          url: `https://api.imgbb.com/1/upload?key=${variable.imgbb.key}`,
          method: "POST",
          timeout: 0,
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
          data: form,
        };
        $.ajax(settings).done(function (response) {
          const jx = JSON.parse(response);
          data.display.element[data.display.key].layer[variable.layer].src = jx.data.url;
          ((imgSrc) => {
            let newImg = new Image();
            newImg.onload = function () {
              data.display.element[data.display.key].layer[variable.layer].dimension.naturalwidth = newImg.width;
              data.display.element[data.display.key].layer[variable.layer].dimension.naturalheight = newImg.height;
              jd.layer(variable.layer).html(``);
              canvas.layer(variable.layer);
              method.imagerecent(imgSrc);
              method.unredo(data);
            };
            newImg.src = imgSrc;
          })(data.display.element[data.display.key].layer[variable.layer].src);
        });
        jd.pointer(`image-selectupload`).val(null);
      },
    },
    {
      pointer: "image-selectimport",
      value: (v) => {
        jd.layer(variable.layer).css({backgroundImage: ``}).html(`<span style="font-size: 0.1em">Loading...</span>`);
        data.display.element[data.display.key].layer[variable.layer].src = v;
        ((imgSrc) => {
          var newImg = new Image();
          newImg.onload = function () {
            data.display.element[data.display.key].layer[variable.layer].dimension.naturalwidth = newImg.width;
            data.display.element[data.display.key].layer[variable.layer].dimension.naturalheight = newImg.height;
            jd.layer(variable.layer).html(``);
            method.imagerecent(imgSrc);
            canvas.layer(variable.layer);
          };
          newImg.src = imgSrc;
        })(data.display.element[data.display.key].layer[variable.layer].src);
      },
    },
    {
      pointer: "image-selectpixabaykeyword",
      value: (v) => {
        variable.pixabay.keyword = encodeURIComponent(v);
      },
    },
    {
      pointer: "image-selectpixabaycolor",
      value: (v) => {
        variable.pixabay.color =encodeURIComponent(v);
      },
    },
    {
      pointer: "image-selectpixabaytype",
      value: (v) => {
        variable.pixabay.type = encodeURIComponent(v);
      },
    },
    {
      pointer: "image-selectpixabaysearch",
      value: (v = null) => {
        variable.pixabay.page = 1;
        var settings = {
          url: `https://pixabay.com/api/?key=${variable.pixabay.key}&q=${variable.pixabay.keyword}&image_type=${variable.pixabay.type}&page=${variable.pixabay.page}&colors=${variable.pixabay.color}&safesearch=true&pretty=true`,
          method: "GET",
          timeout: 0,
          processData: false,
          contentType: false,
        };
        jd.class(`image-selectpixabaylist`).html("");
        $.ajax(settings).done(function (response) {
          let template = variable.template.imageselectpixabaylist;
          $.each(response.hits, function (index, value) {
            const preview = response.hits[index].previewURL;
            const html = template.replace(/>/, ` data-jd-class="input-click" data-jd-pointer="image-selectpixabay" data-jd-value="${response.hits[index].webformatURL}">`).replace(/\{preview\}/g,`${preview}`);
            jd.class(`image-selectpixabaylist`).append(html);
          });
          if (response.hits.length < 20) {
            jd.class(`image-selectpixabaylist`).append(`<div style:"text-align: center">not found?</div>`);
          }
          response.hits.length == 20? jd.pointer(`image-selectpixabaynext`).css({display: "initial",}): jd.pointer(`image-selectpixabaynext`).css({display: "none"});
        });
      },
    },
    {
      pointer: "image-selectpixabaynext",
      value: (v = null) => {
        variable.pixabay.page += 1;
        var settings = {
          url: `https://pixabay.com/api/?key=${variable.pixabay.key}&q=${variable.pixabay.keyword}&image_type=${variable.pixabay.type}&page=${variable.pixabay.page}&colors=${variable.pixabay.color}&safesearch=true&pretty=true`,
          method: "GET",
          timeout: 0,
          processData: false,
          contentType: false,
        };
        jd.class(`image-selectpixabaylist`).html("");
        $.ajax(settings).done(function (response) {
          let template = variable.template.imageselectpixabaylist;
          $.each(response.hits, function (index, value) {
            const preview = response.hits[index].previewURL;
            const html = template.replace(/>/, ` data-jd-class="input-click" data-jd-pointer="image-selectpixabay" data-jd-value="${response.hits[index].webformatURL}">`).replace(/\{preview\}/g,`${preview}`);
            jd.class(`image-selectpixabaylist`).append(html);
          });
          if (response.hits.length < 20) {
            jd.class(`image-selectpixabaylist`).append(`<div style:"text-align: center">not found?</div>`);
          }
          response.hits.length == 20? jd.pointer(`image-selectpixabaynext`).css({display: "initial",}): jd.pointer(`image-selectpixabaynext`).css({display: "none"});
        });
      },
    },
    {
      pointer: "image-selectpixabay",
      value: (v) => {
        jd.layer(variable.layer).css({backgroundImage: ``}).html(`<span style="font-size: 0.1em">Loading...</span>`);
        const settings = {
          url: `https://api.imgbb.com/1/upload?key=${variable.imgbb.key}&image=${v}`,
          method: "GET",
          timeout: 0,
          processData: false,
        };

        $.ajax(settings).done(function (response) {
          const jx = response;
          data.display.element[data.display.key].layer[variable.layer].src = jx.data.url;
          ((imgSrc) => {
            var newImg = new Image();
            newImg.onload = function () {
              data.display.element[data.display.key].layer[variable.layer].dimension.naturalwidth = newImg.width;
              data.display.element[data.display.key].layer[variable.layer].dimension.naturalheight = newImg.height;
              jd.layer(variable.layer).html(``);
              method.imagerecent(imgSrc);
              canvas.layer(variable.layer);
            };
            newImg.src = imgSrc;
          })(data.display.element[data.display.key].layer[variable.layer].src);
        });
        
      },
    },

    {
      pointer: "image-selectrecentnewest",
      value: (v) => {
        variable.imagerecent.page = 1;
        variable.imagerecent.items = JSON.parse(`${JSON.stringify(method.imagerecent())}`).reverse();
        jd.class(`image-selectrecentlist`).html(``);
        let template = variable.template.imageselectrecentlist;
        for (var i = 0; i < ((variable.imagerecent.items.length > 20)?20:variable.imagerecent.items.length); i++) {
          const preview = variable.imagerecent.items[i];
          const html = template.replace(/>/, ` data-jd-class="input-click" data-jd-pointer="image-selectimport" data-jd-value="${preview}">`).replace(/\{preview\}/g,`${preview}`);
          jd.class(`image-selectrecentlist`).append(html);
          (i==19)?jd.pointer(`image-selectrecentnext`).css({display: "initial",}): jd.pointer(`image-selectrecentnext`).css({display: "none"});
        }
      }
    },
    {
      pointer: "image-selectrecentnext",
      value: (v) => {
        variable.imagerecent.page = 1;
        variable.imagerecent.items = JSON.parse(`${JSON.stringify(method.imagerecent())}`).reverse();
        jd.class(`image-selectrecentlist`).html(``);
        let template = variable.template.imageselectrecentlist;
        for (let i = ((variable.imagerecent.page-1)*20); i < ((variable.imagerecent.page)*20); i++) {
          const preview = variable.imagerecent.items[i];
          const html = template.replace(/>/, ` data-jd-class="input-click" data-jd-pointer="image-selectimport" data-jd-value="${preview}">`).replace(/\{preview\}/g,`${preview}`);
          jd.class(`image-selectrecentlist`).append(html);
          (i==((variable.imagerecent.page)*20)-1)?jd.pointer(`image-selectrecentnext`).css({display: `initial`}):jd.pointer(`image-selectrecentnext`).css({display: `none`});        }
      }
    },
    // dev
    {
      pointer: "image-positionx",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].position.left = method.inputvalue(v, -200, 1000);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-positionx`, data.display.element[data.display.key].layer[variable.layer].position.left, -200, 1000);
      }
    },
    {
      pointer: "image-positiony",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].position.top = method.inputvalue(v, -200, 1000);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-positiony`, data.display.element[data.display.key].layer[variable.layer].position.top, -200, 1000)
      }
    },
    {
      pointer: "image-transformrotate",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.rotate = method.inputvalue(v, -180, 180);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-transformrotate`, data.display.element[data.display.key].layer[variable.layer].transform.rotate, -180, 180);
      }
    },
    {
      pointer: "image-transformskew",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.skew = method.inputvalue(v, -88, 88);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-transformskew`, data.display.element[data.display.key].layer[variable.layer].transform.skew, -88, 88);
      }
    },
    {
      pointer: "image-transformfliphorizontal",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.flip.horizontal = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-transformfliphorizontal`, data.display.element[data.display.key].layer[variable.layer].transform.flip.horizontal);
      }
    },
    {
      pointer: "image-transformflipvertical",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].transform.flip.vertical = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-transformflipvertical`, data.display.element[data.display.key].layer[variable.layer].transform.flip.vertical);
      }
    },
    {
      pointer: "image-dimensionnatural",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].dimension.natural = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-dimensionnatural`, data.display.element[data.display.key].layer[variable.layer].dimension.natural);
      }
    },
    {
      pointer: "image-dimensionwidth",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].dimension.width = method.inputvalue(v, 0, 1000);
        if (data.display.element[data.display.key].layer[variable.layer].dimension.natural) {
          data.display.element[data.display.key].layer[variable.layer].dimension.height = (data.display.element[data.display.key].layer[variable.layer].dimension.width *data.display.element[data.display.key].layer[variable.layer].dimension.naturalheight) /data.display.element[data.display.key].layer[variable.layer].dimension.naturalwidth;
        }
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-dimensionwidth`, data.display.element[data.display.key].layer[variable.layer].dimension.width, 0, 1000);
        method.inputrender(`image-dimensionheight`, data.display.element[data.display.key].layer[variable.layer].dimension.height, 0, 1000);
      }
    },
    {
      pointer: "image-dimensionheight",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].dimension.height = method.inputvalue(v, 0, 1000);
          if (
            data.display.element[data.display.key].layer[variable.layer].dimension.natural) {
            data.display.element[data.display.key].layer[variable.layer].dimension.width =(data.display.element[data.display.key].layer[variable.layer].dimension.naturalwidth *data.display.element[data.display.key].layer[variable.layer].dimension.height) /data.display.element[data.display.key].layer[variable.layer].dimension.naturalheight;
          }
          canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-dimensionheight`, data.display.element[data.display.key].layer[variable.layer].dimension.height, 0, 1000);
        method.inputrender(`image-dimensionwidth`, data.display.element[data.display.key].layer[variable.layer].dimension.width, 0, 1000);
      }
    },
    {
      pointer: "image-coloreditmode",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.edit.mode = v == "true" ? true : false;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-coloreditmode`, data.display.element[data.display.key].layer[variable.layer].color.edit.mode);
      }
    },
    {
      pointer: "image-coloreditmain",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.edit.main = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-coloreditmain`, data.display.element[data.display.key].layer[variable.layer].color.edit.main);
      }
    },
    {
      pointer: "image-colorbackground",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1] = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-colorbackground`, data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1]);
      }
    },
    {
      pointer: "image-colorbackgroundtype",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.type = v;
        if (data.display.element[data.display.key].layer[variable.layer].color.background.type == "normal" ||data.display.element[data.display.key].layer[variable.layer].color.background.type == "same-parent") {
          data.display.element[data.display.key].layer[variable.layer].color.background.main = [data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1]];
        }
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-colorbackgroundtype`, data.display.element[data.display.key].layer[variable.layer].color.background.type);
        data.display.element[data.display.key].layer[variable.layer].color.background.type != "normal" &&data.display.element[data.display.key].layer[variable.layer].color.background.type != "same-parent" &&data.display.element[data.display.key].layer[variable.layer].color.background.type != "none"? jd.pointer(`image-colorbackgroundadd`).css({display: "block",}): jd.pointer(`image-colorbackgroundadd`).css({display: "none",});
        data.display.element[data.display.key].layer[variable.layer].color.background.type == "linear-gradient"? jd.pointer(`image-colorbackgroundposlinear`).css({display: "block",}): jd.pointer(`image-colorbackgroundposlinear`).css({display: "none",});
        data.display.element[data.display.key].layer[variable.layer].color.background.type == "radial-gradient"? $(`[data-jd-pointer='image-colorbackgroundposrasialx'], [data-jd-pointer='image-colorbackgroundposrasialy']`).css({display: "block",}): $(`[data-jd-pointer='image-colorbackgroundposrasialx'], [data-jd-pointer='image-colorbackgroundposrasialy']`).css({display: "none",});
      }
    },
    {
      pointer: "image-colorbackgroundadd",
      value: (v = null) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.main.push(method.colorinvert(data.display.element[data.display.key].layer[variable.layer].color.background.main[data.display.element[data.display.key].layer[variable.layer].color.background.main.length - 1]));
        canvas.layer(variable.layer);
      }
    },
    {
      pointer: "image-colorbackgroundposlinear",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.poslinear = method.inputvalue(v, -180, 180);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-colorbackgroundposlinear`, data.display.element[data.display.key].layer[variable.layer].color.background.poslinear, -180, 180);
      }
    },
    {
      pointer: "image-colorbackgroundposrasialx",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.posradialx = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-colorbackgroundposrasialx`, data.display.element[data.display.key].layer[variable.layer].color.background.posradialx, 0, 100);
      }
    },
    {
      pointer: "image-colorbackgroundposrasialy",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.background.posradialy = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-colorbackgroundposrasialy`, data.display.element[data.display.key].layer[variable.layer].color.background.posradialy, 0, 100);
      }
    },

    {
      pointer: "image-coloropacity",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.opacity = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-coloropacity`, data.display.element[data.display.key].layer[variable.layer].color.opacity, 0, 100);
      }
    },
    {
      pointer: "image-colorfilter",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].color.filter = v;
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-colorfilter`, data.display.element[data.display.key].layer[variable.layer].color.filter);
      }
    },
    {
      pointer: "image-effectstrokecolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.stroke.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-effectstrokecolor`, data.display.element[data.display.key].layer[variable.layer].effect.stroke.color);
      }
    },
    {
      pointer: "image-effectstrokewidth",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.stroke.width = method.inputvalue(v, 0, 35);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-effectstrokewidth`, data.display.element[data.display.key].layer[variable.layer].effect.stroke.width, 0, 35);
      }
    },
    {
      pointer: "image-effectdepthtype",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.depth.type = Number(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-effectdepthtype`, data.display.element[data.display.key].layer[variable.layer].effect.depth.type);
      }
    },
    {
      pointer: "image-effectdepthcolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.depth.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-effectdepthcolor`, data.display.element[data.display.key].layer[variable.layer].effect.depth.color);
      }
    },
    {
      pointer: "image-effectdepthwidth",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.depth.width = method.inputvalue(v, 0, 15);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-effectdepthwidth`, data.display.element[data.display.key].layer[variable.layer].effect.depth.width, 0, 15);
      }
    },
    {
      pointer: "image-effectoutlinecolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.outline.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-effectoutlinecolor`, data.display.element[data.display.key].layer[variable.layer].effect.outline.color);
      }
    },
    {
      pointer: "image-effectoutlinewidth",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].effect.outline.width = method.inputvalue(v, 0, 35);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-effectoutlinewidth`, data.display.element[data.display.key].layer[variable.layer].effect.outline.width, 0, 35);
      }
    },
    {
      pointer: "image-shadowcolor",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.color = method.inputcolor(v);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-shadowcolor`, data.display.element[data.display.key].layer[variable.layer].shadow.color);
      }
    },
    {
      pointer: "image-shadowblur",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.blur = method.inputvalue(v, 0, 50);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-shadowblur`, data.display.element[data.display.key].layer[variable.layer].shadow.blur, 0, 50);
      }
    },
    {
      pointer: "image-shadowposx",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.posx = method.inputvalue(v, -350, 350);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-shadowposx`, data.display.element[data.display.key].layer[variable.layer].shadow.posx, -350, 350);
      }
    },
    {
      pointer: "image-shadowposy",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].shadow.posy = method.inputvalue(v, -350, 350);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-shadowposy`, data.display.element[data.display.key].layer[variable.layer].shadow.posy, -350, 350);
      }
    },
    {
      pointer: "image-roundtopleft",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].round.top.left = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-roundtopleft`, data.display.element[data.display.key].layer[variable.layer].round.top.left, 0, 100);
      }
    },
    {
      pointer: "image-roundtopright",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].round.top.right = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-roundtopright`, data.display.element[data.display.key].layer[variable.layer].round.top.right, 0, 100);
      }
    },
    {
      pointer: "image-roundbottomleft",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].round.bottom.left = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-roundbottomleft`, data.display.element[data.display.key].layer[variable.layer].round.bottom.left, 0, 100);
      }
    },
    {
      pointer: "image-roundbottomright",
      value: (v) => {
        data.display.element[data.display.key].layer[variable.layer].round.bottom.right = method.inputvalue(v, 0, 100);
        canvas.layer(variable.layer);
      },
      render:()=>{
        method.inputrender(`image-roundbottomright`, data.display.element[data.display.key].layer[variable.layer].round.bottom.right, 0, 100);
      }
    },
    {
      pointer: "save",
      value: (v=null) => {
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
          if (req.readyState == XMLHttpRequest.DONE) {
            let id = JSON.parse(req.responseText).metadata.id;
            variable.capture.status = false;
            variable.capture.mockup.url = [];
            variable.capture.raw.url = [];
            $.each(data.display.position, (i, v)=>{
              if (v.available) {
                variable.capture.mockup.url.push(`https://joyo-design.github.io/capture.html?jsonbin_id=${id}&mode=mockup&position=${i}`);
                if (data.display.element[i].layer.length != 0) {
                  variable.capture.raw.url.push(`https://joyo-design.github.io/capture.html?jsonbin_id=${id}&mode=raw&position=${i}`);
                }
              }
            });
            console.log(variable.capture);
            method.capture();
          }
        };
          
        req.open("POST", "https://api.jsonbin.io/v3/b", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Bin-Private", false);
        req.setRequestHeader("X-Master-Key", `${variable.jsonbin.key}`);
        req.send(JSON.stringify(data));
      },
      render:()=>{
       
      }
    },
  ];

  const input = {
    value:(p, v)=>{
      $.each(event, (i, x)=>{
        if (x.pointer == p) {
          event[i].value(v);
          try{event[i].render();}catch{}
        }
      });
    },
    render:(v=null)=>{
      $.each(event, (i, x)=>{
        try {
          if( v!= null){
            if(x.pointer == v){
              event[i].render();
            }
          }
          else{
            event[i].render();
          }
        }catch{}
      });
    }
  }

  const canvas = {
    mode:()=>{
      const cssmain = {
        paddingBottom: `${(variable.canvas.mode == `mockup`)?`100%`:`${(variable.canvas.width*data.display.position[data.display.key].printable.height)/data.display.position[data.display.key].printable.width}px`}`
      }
      const csswrap = {
        transform: `scale(${variable.canvas.width / 1000})`,
        top: `${Number(variable.canvas.width / 1000) <= 1? "-" + Number((1 - Number(variable.canvas.width / 1000)) / 2): Number((1 - Number(variable.canvas.width / 1000)) / 2) * -1}em`,
        left: `${Number(variable.canvas.width / 1000) <= 1? "-" + Number((1 - Number(variable.canvas.width / 1000)) / 2): Number((1 - Number(variable.canvas.width / 1000)) / 2) * -1}em`,
      }
      const csscanvas = ()=>{
        $(`#jd-canvas`).attr(`style`, ``);
        const scale = 1000/data.display.position[data.display.key].printable.width;
        const css = {
          transform: `scale(${scale})`,
          top: `${((scale*1000/2)-500)-(scale*data.display.position[data.display.key].printable.top)}px`,
          left: `${((scale*1000/2)-500)-(scale*data.display.position[data.display.key].printable.left)}px`
        }
        return (variable.canvas.mode != `mockup`)?css:JSON.parse(`{}`);
      }
      const csszoom = {
        display: `${(variable.canvas.mode == "raw")?"none":"initial"}`
      }
      $(`#jd-main`).css(cssmain);
      $(`#jd-wrap`).css(csswrap);
      $(`#jd-canvas`).css(csscanvas());
      $(`#jd-canvas-top, #jd-canvas-bottom, #jd-canvas-color`).css(csszoom);
    },
    color:()=>{
      $("#jd-canvas-color").css("backgroundColor",`${data.product.color.main}`);
    },
    position: () => {
      $("#jd-canvas-bottom").css("backgroundImage",`url('${data.display.position[data.display.key].image.bottom}')`);
      $("#jd-canvas-top").css("backgroundImage",`url('${data.display.position[data.display.key].image.top}')`);
    },
    printable:() =>{
      $(`#jd-printable`).css({display:`${(variable.printable)?"block":"none"}`, width: `${data.display.position[data.display.key].printable.width}px`, height:`${data.display.position[data.display.key].printable.height}px`, border: `1px solid ${method.colorinvert(data.product.color.main)}`, left: `${data.display.position[data.display.key].printable.left}px`, top:`${data.display.position[data.display.key].printable.top}px`});
    },
    element: () => {
      $("#jd-canvas-element").html("");
      $.each(data.display.element[data.display.key].layer, function (i, v) {
        $("#jd-canvas-element").append(`<div class="jd-canvas-element-${data.display.element[data.display.key].layer[i].type} jd-canvas-element-layer" data-jd-element-type="${data.display.element[data.display.key].layer[i].type}" data-jd-element-layer="${i}"></div>`);
        canvas.layer(i);
      });
    },
    layer: (n) => {
      const pointer = {
        "outline":[{"x":"-","y":"-"},{"x":"","y":""},{"x":"","y":"-"},{"x":"-","y":""}],
        "depth":[{"x":-1,"y":-1},{"x":0,"y":-1},{"x":1,"y":-1},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":1},{"x":-1,"y":1},{"x":-1,"y":0}]
      };
      const stroke = ()=>{
        let stroke = ``;
        $.each(pointer.outline, (i, v)=>{
          stroke += `drop-shadow(${v.x}${(data.display.element[data.display.key].layer[n].effect.stroke.width /1000).toFixed(3)}em ${v.y}${(data.display.element[data.display.key].layer[n].effect.stroke.width /1000).toFixed(3)}em 0em ${data.display.element[data.display.key].layer[n].effect.stroke.color}) `;
        });
        stroke = `${data.display.element[data.display.key].layer[n].effect.stroke.width != 0? stroke: ""}`;
        return stroke;
      }
      const outline = ()=>{
        let outline = ``;
        $.each(pointer.outline, (i, v)=>{
          outline += `drop-shadow(${v.x}${(data.display.element[data.display.key].layer[n].effect.outline.width /1000).toFixed(3)}em ${v.y}${(data.display.element[data.display.key].layer[n].effect.outline.width /1000).toFixed(3)}em 0em ${data.display.element[data.display.key].layer[n].effect.outline.color}) `;
        });
        outline = `${data.display.element[data.display.key].layer[n].effect.outline.width !=0? outline: ""}`;
        return outline;
      }
      const depth = ()=>{
        let depth = ``;
        for (var l = 0;l <= data.display.element[data.display.key].layer[n].effect.depth.width;l++) {
          depth += `drop-shadow(${pointer.depth[data.display.element[data.display.key].layer[n].effect.depth.type].x *l *0.01}em ${pointer.depth[data.display.element[data.display.key].layer[n].effect.depth.type].y *l *0.01}em ${(l==0)?"1px":"0em"} ${data.display.element[data.display.key].layer[n].effect.depth.color})`;
        }
        depth = `${data.display.element[data.display.key].layer[n].effect.depth.width != 0? depth: ""}`;
        return depth;
      }
      
      const color = ()=>{
        let color = `linear-gradient(0deg, ${data.display.element[data.display.key].layer[n].color.background.main[data.display.element[data.display.key].layer[n].color.background.main.length - 1]}, ${data.display.element[data.display.key].layer[n].color.background.main[data.display.element[data.display.key].layer[n].color.background.main.length - 1]})`;
        let gradient = `${data.display.element[data.display.key].layer[n].color.background.main[data.display.element[data.display.key].layer[n].color.background.main.length - 1]}, ${data.display.element[data.display.key].layer[n].color.background.main[data.display.element[data.display.key].layer[n].color.background.main.length - 1]}`;
        if (data.display.element[data.display.key].layer[n].color.background.main.length > 1) {
          gradient = ``;
          for (let j = 0;j <data.display.element[data.display.key].layer[n].color.background.main.length;j++) {
            gradient += `${data.display.element[data.display.key].layer[n].color.background.main[j]},`;
          }
          gradient = gradient.substring(0, gradient.length - 1);
        }
        switch (data.display.element[data.display.key].layer[n].color.background.type) {
          case "linear-gradient":
            color = `linear-gradient(${data.display.element[data.display.key].layer[n].color.background.poslinear}deg, ${gradient})`;
            break;
          case "radial-gradient":
            color = `radial-gradient(circle at ${data.display.element[data.display.key].layer[n].color.background.posradialx}% ${data.display.element[data.display.key].layer[n].color.background.posradialy}%, ${gradient})`;
            break;
          case "same-parent":
            color = `linear-gradient(0deg, ${data.product.color.main}, ${data.product.color.main})`;
            break;
        }
        return color;
      }
      
      const shadow = `${data.display.element[data.display.key].layer[n].shadow.blur == 0 &&data.display.element[data.display.key].layer[n].shadow.posx == 0 &&data.display.element[data.display.key].layer[n].shadow.posy == 0? ``: `drop-shadow(${(data.display.element[data.display.key].layer[n].shadow.posx / 100).toFixed(3)}em ${(data.display.element[data.display.key].layer[n].shadow.posy / 100).toFixed(3)}em ${(data.display.element[data.display.key].layer[n].shadow.blur / 100).toFixed(3)}em ${data.display.element[data.display.key].layer[n].shadow.color})`}`;
      

      jd.layer(n).attr("style","");
      if (jd.layer(n).attr("data-jd-element-type") == "text") {
        method.font(data.display.element[data.display.key].layer[n].font.family, data.display.element[data.display.key].layer[n].font.source);

        const css = {
          textStroke: `${(data.display.element[data.display.key].layer[n].effect.stroke.width / 1000).toFixed(3)}em ${data.display.element[data.display.key].layer[n].effect.stroke.color}`,
          textAlign: `${data.display.element[data.display.key].layer[n].text.align}`,
          fontFamily: `${data.display.element[data.display.key].layer[n].font.family}`,
          fontWeight: `${data.display.element[data.display.key].layer[n].text.bold? "bold": "normal"}`,
          fontStyle: `${data.display.element[data.display.key].layer[n].text.italic? "italic": "normal"}`,
          fontSize: `${data.display.element[data.display.key].layer[n].size.fontsize}px`,
          letterSpacing: `${(data.display.element[data.display.key].layer[n].size.letterspacing /100).toFixed(2)}em`,
          lineHeight: `${(data.display.element[data.display.key].layer[n].size.lineheight /100).toFixed(2)}em`,
          top: `${data.display.element[data.display.key].layer[n].position.top}px`,
          left: `${data.display.element[data.display.key].layer[n].position.left}px`,
          transform: `rotate(${data.display.element[data.display.key].layer[n].transform.rotate}deg) skew(${data.display.element[data.display.key].layer[n].transform.skew}deg) scaleX(${data.display.element[data.display.key].layer[n].transform.flip.vertical? "-1": "1"}) scaleY(${data.display.element[data.display.key].layer[n].transform.flip.horizontal? "-1": "1"})`,
          filter: `opacity(${(data.display.element[data.display.key].layer[n].color.opacity / 100).toFixed(2)}) ${outline()} ${depth()} ${shadow}`,
        };
        jd.layer(n).html(String(decodeURIComponent(data.display.element[data.display.key].layer[n].text.write)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>"));
        if (data.display.element[data.display.key].layer[n].effect.curve.type == 0) {
          jd.layer(n).addClass("jd-canvas-element-text").css(css).css({borderBottom: `${data.display.element[data.display.key].layer[n].text.underline? `0.1em solid ${data.display.element[data.display.key].layer[n].color.background.main[data.display.element[data.display.key].layer[n].color.background.main.length - 1]}`: "none"}`,backgroundImage: `${color()}`,});
        } 
        else {
          const text = JSON.stringify(decodeURIComponent(data.display.element[data.display.key].layer[n].text.write).split(""));
          const curve = {
            text:{
              start: JSON.parse(`${text}`).splice(0,JSON.parse(`${text}`).length % 2 == 1? JSON.parse(`${text}`).length / 2 - 0.5: JSON.parse(`${text}`).length / 2).reverse(),
              middle: JSON.parse(`${text}`).length % 2 == 1? JSON.parse(`${text}`)[JSON.parse(`${text}`).length / 2 - 0.5]: "",
              end: JSON.parse(`${text}`).splice(JSON.parse(`${text}`).length % 2 == 1? JSON.parse(`${text}`).length / 2 + 0.5: JSON.parse(`${text}`).length / 2,JSON.parse(`${text}`).length - 1)
            },
            data: {
              type: data.display.element[data.display.key].layer[n].effect.curve.type -1,
              round: data.display.element[data.display.key].layer[n].effect.curve.round,
              degree: data.display.element[data.display.key].layer[n].effect.curve.degree,
            },
            pointer:[
              {rs: "-",re: "",ps: "bottom",pe: "top",rps: "",rpe: "-",},
              {rs: "",re: "-",ps: "top",pe: "bottom",rps: "-",rpe: "",},
              {rs: "-",re: "",ps: "bottom",pe: "top",rps: "",rpe: "-",},
              {rs: "",re: "-",ps: "top",pe: "bottom",rps: "-",rpe: "",},
            ]
          }
          const separator = JSON.parse(`${text}`).length % 2 == 1? curve.data.degree / curve.text.start.length: (curve.data.degree * 2) / (curve.text.start.length * 2 - 1);
          const rs = (i)=>{
            const pointer = curve.pointer[curve.data.type].rs;
            const rotate = JSON.parse(`${text}`).length % 2 == 1? (i + 1) * separator: (i + 1) * separator - separator / 2;
            return pointer+rotate;
          }
          const rps = (i)=>{
            const pointer= curve.pointer[curve.data.type].rps;
            const rotate = curve.data.type == 2 || curve.data.type == 3? JSON.parse(`${text}`).length % 2 == 1? (i + 1) * separator: (i + 1) * separator - separator / 2: "0";
            return pointer+rotate;
          }
          const re = (i)=>{
            const pointer = curve.pointer[curve.data.type].re;
            const rotate = JSON.parse(`${text}`).length % 2 == 1? (i + 1) * separator: (i + 1) * separator - separator / 2;
            return pointer+rotate;
          }
          const rpe = (i)=>{
            const pointer= curve.pointer[curve.data.type].rpe;
            const rotate = curve.data.type == 2 || curve.data.type == 3? JSON.parse(`${text}`).length % 2 == 1? (i + 1) * separator: (i + 1) * separator - separator / 2: "0";
            return pointer+rotate;
          }

          const html = ()=>{
            let html= '';
            $.each(curve.text.start, function (i, v) {
            html += `
              <div style="transform: rotate(${rs(i)}deg)">
                <div>
                  <div style="transform: rotate(${rps(i)}deg)">
                    <div>${v}</div>
                </div>
              </div>
            </div>`;
            });

            html += `
              <div style="transform: rotate(0deg)">
                <div>
                  <div style="transform: rotate(0deg)">
                    <div>${curve.text.middle}</div>
                </div>
              </div>
            </div>`;
            $.each(curve.text.end, function (i, v) {
              html += `
              <div style="transform: rotate(${re(i)}deg)">
                <div>
                  <div style="transform: rotate(${rpe(i)}deg)">
                    <div>${v}</div>
                </div>
              </div>
            </div>`;
            });
            return html;
          }

          const addcss = {
            position: `absolute`,
            width: `${css.fontSize}`,
            height: `${css.fontSize}`,
            lineHeight: `1em`,
          };
          jd.layer(n).removeClass("jd-canvas-element-text").css(css).css(addcss).html(html());
          $(`.jd-canvas-element-layer[data-jd-element-layer="${n}"] > div`).css(addcss);
          $(`.jd-canvas-element-layer[data-jd-element-layer="${n}"] > div > div`).css(addcss).css({height: `${Number(curve.data.round / 100).toFixed(3)}em`,}).css(curve.pointer[curve.data.type].ps, "0px");
          $(`.jd-canvas-element-layer[data-jd-element-layer="${n}"] > div > div > div`).css(addcss).css(curve.pointer[curve.data.type].pe, "0px");
          $(`.jd-canvas-element-layer[data-jd-element-layer="${n}"] > div > div > div > div`).css({
            whiteSpace: `nowrap`,
            webkitBackgroundClip: `text`,
            webkitTextFillColor: `transparent`,
            backgroundClip: `text`,
            color: `transparent`,
            backgroundImage: `${color()}`,
            paddingBottom: "0.5em",
            textAlign: "center",
          });
        }
      } else {
        const css = {
          backgroundImage: `url('${data.display.element[data.display.key].layer[n].src}') ${data.display.element[data.display.key].layer[n].color.background.type == "none"? "": `, ${color()}`}`,
          top: `${data.display.element[data.display.key].layer[n].position.top}px`,
          left: `${data.display.element[data.display.key].layer[n].position.left}px`,
          fontSize: `${data.display.element[data.display.key].layer[n].dimension.width}px`,
          width: `${data.display.element[data.display.key].layer[n].dimension.width}px`,
          height: `${data.display.element[data.display.key].layer[n].dimension.natural? `${(data.display.element[data.display.key].layer[n].dimension.width *data.display.element[data.display.key].layer[n].dimension.naturalheight) /data.display.element[data.display.key].layer[n].dimension.naturalwidth}`: `${data.display.element[data.display.key].layer[n].dimension.height}`}px`,
          transform: `rotate(${data.display.element[data.display.key].layer[n].transform.rotate}deg) skew(${data.display.element[data.display.key].layer[n].transform.skew}deg) scaleX(${data.display.element[data.display.key].layer[n].transform.flip.vertical? "-1": "1"}) scaleY(${data.display.element[data.display.key].layer[n].transform.flip.horizontal? "-1": "1"})`,
          filter: `${data.display.element[data.display.key].layer[n].color.edit.mode? `opacity(0.9) grayscale(100%) drop-shadow(0em 0em 0em ${data.display.element[data.display.key].layer[n].color.edit.main}) saturate(100)`: ``} ${data.display.element[data.display.key].layer[n].color.filter} ${stroke()} ${outline()} ${depth()} ${shadow} opacity(${(data.display.element[data.display.key].layer[n].color.opacity / 100).toFixed(2)})`,
          borderRadius: `${data.display.element[data.display.key].layer[n].round.top.left}% ${data.display.element[data.display.key].layer[n].round.top.right}% ${data.display.element[data.display.key].layer[n].round.bottom.left}% ${data.display.element[data.display.key].layer[n].round.bottom.right}%`,};
        jd.layer(n).css(css);
      }
    },
    render:()=>{
      canvas.mode();
      canvas.color();
      canvas.position();
      canvas.printable();
      canvas.element();
    }
  }


  


  const init = {
    canvas:()=>{
      jd.class(`main`).attr("id", "jd-main").html(variable.canvas.html);
    },
    action:()=>{
      variable.action.active = jd.class(`action`).first().attr('data-jd-value');
    },
    store:()=>{
      method.unredo(data);
    },
    event:()=>{
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
              input.value(i, v);
            },
          });
        });
      })();
      (() => {
        $(document).on(`change`, '[data-jd-class="input-change"]', function () {
          this.setAttribute("data-jd-value", this.value);
          let i = this.getAttribute("data-jd-pointer");
          let v = this.getAttribute("data-jd-value");
          input.value(i, v);
          method.unredo(data);
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
          input.value(i, v);
        });
      })();
      (() => {
        $(document).on(`click`, '[data-jd-class="input-click"]', function () {
          let i = this.getAttribute("data-jd-pointer");
          let v = this.getAttribute("data-jd-value");
          input.value(i, v);
          method.unredo(data);
        });
      })();
    }
  }

  const result = {
    template:(v)=>{
      if(v.elementlayerlist != undefined){
        variable.template.elementlayerlist = v.elementlayerlist;
      }
      if(v.textfontlist != undefined){
        variable.template.textfontlist = v.textfontlist;
      }
      if (v.imageselectpixabaylist != undefined) {
        variable.template.imageselectpixabaylist = v.imageselectpixabaylist;
      }
    },
    apikey:(v)=>{
      if(v.googlefont != undefined){
        variable.font.key = v.googlefont;
      }
      if(v.imgbb != undefined){
        variable.imgbb.key = v.imgbb;
      }
      if(v.pixabay != undefined){
        variable.pixabay.key = v.pixabay;
      }
      if(v.jsonbin != undefined){
        variable.jsonbin.key = v.jsonbin;
      }
    },
    position:(v)=>{
      data.display.key = v;
    },
    mode:(v = `mockup`)=>{
      variable.canvas.mode = v;
    },
    create:()=>{
      init.canvas();
      init.action();
      init.store();
      init.event();
      canvas.render();
      input.render();
    }
  }

  return result;
};
