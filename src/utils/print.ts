import printJS from "print-js";
/**
 * 
 * @param {
 *      title:"", // 表名
 *      serial：false, // 是否需要序号
 *      data:[], // 要打印的数据
 *      fields:[], // 需要打印的字段
 *      properties:[
 *          {
 *              field:"字段名（对应fields）",
 *              displayName:"打印时展示的中文表头名字",
 *              columnSize:"定义列宽，用百分比来表示大小，可不传"
 *          }
 *      ],
 * } args
 *  
 */
function printJson(args = {}) {
    let data = [];
    for (let di = 0; di < args.data.length; di++) {
        var obj = {}
        // 如果需要序列号则是列表index+1
        if (args.serial) {
            obj.serial = di + 1
        }
        // 遍历需要打印的字段与列表字段一一对应，形成键值对
        for (let fi = 0; fi < args.fields.length; fi++) {
            obj[args.fields[fi]] = args.data[di][args.fields[fi]]
        }
        data.push(obj)
    }
    let properties = args.properties;
    if (args.serial) {
        properties.unshift({
            field: "serial",
            displayName: "序号",
        })
    }
    printJS({
       printable: data,
       properties: properties || [],
       header: args.title || "",
       // 样式设置
       type: 'json',  // 打印的格式  
       gridStyle: 'border: 1px solid #000;text-align:center;padding:5px 0;', // 表格样式  
       gridHeaderStyle: 'border: 1px solid #000;text-align:center;padding:5px 0;',//表头样式
    });
}
 
export default {
    printJson
}