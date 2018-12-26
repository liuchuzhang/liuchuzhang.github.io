===

标题: 使用 bpmn 显示流程图并设置颜色
标签: vue

===

## 使用 bpmn

前端框架使用 Vue 流程图使用
- [bpmn-js](https://github.com/bpmn-io)   
- [官方文档地址](https://bpmn.io)
- [官方 examples](https://github.com/bpmn-io/bpmn-js-examples)

template

```html
<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
    </div>
</template>
```


script

```js
// 查看 bpmn 目前只需要引入这两个 需要编辑功能查看 https://github.com/bpmn-io
import BpmnModeler from 'bpmn-js/lib/Modeler'
import Modeling from 'bpmn-js/lib/features/modeling/Modeling'
export default {
    mounted() {
      this.initBpmn()
    }, 
    initBpmn() {
      this.container = this.$refs.content
      const canvas = this.$refs.canvas
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        bpmnRenderer: {
          defaultFillColor: 'white',
          defaultStrokeColor: '#5c5d66'
        }
      })
      this.createNewDiagram(this.bpmnModeler)
    },
    createNewDiagram(viewer) {
      // bpmn 的 XML 字符串
      const bpmnXmlStr = ''
      const self = this
      this.bpmnModeler.importXML(bpmnXmlStr, function(err) {
        if (err) {
          console.log('bpmn xml 构建失败!')
          console.error(err)
        } else {
          // self.success()
        }
        const canvas = self.bpmnModeler.get('canvas'),
          elementRegistry = viewer.get('elementRegistry'),
          modeling = viewer.get('modeling'),
          overlays = viewer.get('overlays')
        canvas.zoom('fit-viewport')

        // 项目节点 id
        const nodeIds = ['id1   ...']
        // 线和箭头 id
        const lineIds = ['id1   ...']
        // 分叉节点 id
        const bifIds = ['exclusivegateway1', 'exclusivegateway2']
        const allNodeIds = [...nodeIds, ...lineIds, ...bifIds]
        // 设置 bpmn 样式一共有提供三种方法
        // 新建 Dom 来覆盖样式
        self.setBifNodeColor(bifIds, elementRegistry, overlays)
        // modeling 的方法 setColor 可直接设置颜色
        self.setLineColor(lineIds, modeling, elementRegistry)
        // 添加 ClassName 设置样式
        self.setNodeColor(nodeIds, 'nodeSuccess', canvas)
      })
    },
    setBifNodeColor(ids, elementRegistry, overlays) {
      ids.forEach(id => {
        const shape = elementRegistry.get(id)
        // 这里 $ 为 JQuery 全局的 $
        const $overlayHtml = $('<div class="highlight-overlay">').css({
          width: shape.width,
          height: shape.height,
          // 这里随便搞了个飞机图
          'background-image': 'url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3087158545,508701713&fm=26&gp=0.jpg)',
          'background-size': 'cover'
        })
        overlays.add(id, {
          position: {
            top: 0,
            left: 0
          },
          html: $overlayHtml
        })
      })
    }
}
```

scss 
```scss
.bjs-container {
  pointer-events: none;
}
.canvas .djs-hit {
  pointer-events: none !important;
}
.nodeSuccess {
  .djs-visual {
    rect,
    circle {
      stroke: green !important;
      stroke-width: 2px !important;
      fill: #fff !important;
      color: green;
    }
    tspan {
      fill: green;
    }
    path {
      stroke: green !important;
    }
  }
}

.highlight-overlay {
    // 这里设置样式
}
```

