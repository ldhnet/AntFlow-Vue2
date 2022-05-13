import nodeConfig from "./config.js";
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray( data ) ? data.length === 0 : true

export class FormatDisplayUtils {
    static getNodeType ( node ) { 
        
        console.log('===node.nodeType=======',JSON.stringify(node))

        if(node.nodeType === 1)
        {
            return 'start'
        }
        else if(node.nodeType === 2)
        {
            return 'gateway'
        }
        else if(node.nodeType === 3)
        {
            return 'condition'
        }
        else if(node.nodeType === 4)
        {
            return 'approver'
        }else
        {
            return node.type
        }
      }
       /**
   * 创建Node Tree Data 数据
   * @param { String } type - 节点类型
   * @param { Object } treeData - 节点数据
   * @returns Array
   */
        static createNodeDisplay (nodeData) {     
            let type= this.getNodeType(nodeData)   

            console.log('===nodeTo[0]=======',type)
            let res = JSON.parse( JSON.stringify( nodeConfig[type] ) )
            res.nodeId = nodeData.nodeId
            res.prevId = nodeData.nodeFrom?nodeData.nodeFrom:'' 
            res.nodeFrom = [res.prevId]
            res.nodeTo = nodeData.nodeTo
            return res
          }
      /**
   * 创建Node Tree Data 数据
   * @param { String } type - 节点类型
   * @param { Object } treeData - 节点数据
   * @returns Array
   */ 
    static depthChildNodeToTree (nodeTree,nodeData) {
        //console.log('treeData====',JSON.stringify(nodeData)); 
        if(isEmpty(nodeTree) || isEmptyArray(nodeData)) return nodeTree
        
        let currentNode=this.createNodeDisplay(nodeTree)

        let nodeTo=currentNode.nodeTo
        if(isEmptyArray(nodeTo)) return currentNode
        if(currentNode.type != 'gateway')
        {
            let childNode = nodeData.filter(m=> { return m.nodeId == nodeTo[0] }).shift()

            currentNode.children=this.createNodeDisplay(childNode) 
           
            this.depthChildNodeToTree(currentNode.children,nodeData.filter(m=> { return m.nodeId != nodeTo[0] }))
        }
        else
        {
            currentNode.conditionNodes=[]
            for(let id in nodeTo)
            {
                let conNode = nodeData.filter(m=> { return m.nodeId == id }).shift()     
                if(isEmpty(conNode)) continue
                nodeData = nodeData.filter(m=> { return m.nodeId != id })
                if(conNode.nodeType == 2 || conNode.nodeType == 4)
                {
                    currentNode.children = this.createNodeDisplay(conNode)
                } 
                else if(conNode.nodeType == 3)
                { 
                    currentNode.conditionNodes.push(this.createNodeDisplay(conNode)) 
                } 
            }
            for(let childNode in currentNode.conditionNodes)
            {
                this.depthChildNodeToTree(childNode,nodeData)
            }
        } 
        return currentNode
    }
  
    static depthConverterToTree(parmData)
    {
        if(isEmptyArray(parmData)) return
        let startNode = parmData.filter(m=> { return m.nodeType == 1 }).shift()

        let nodeData = parmData.filter(m=> { return m.nodeType != 1 })
 
        let resultNode = this.depthChildNodeToTree(startNode,nodeData)

        console.log('resultNode====',JSON.stringify(resultNode)); 

    }
   // static depthConditionNodeToTree (nodeData) {
    //     console.log('treeData====',JSON.stringify(nodeData)); 
       
    //     return nodeData
    // }
    static toTree(data) {
        
        let obj = {}, // 使用对象重新存储数据
          res = [], // 存储最后结果
          len = data.length
       
        // 遍历原始数据data，构造obj数据，键名为id，值为数据
        for (let i = 0; i < len; i++) {
          obj[data[i]['id']] = data[i]
        }
       
        // 遍历原始数据
        for (let j = 0; j < len; j++) {
          let list = data[j]
          // 通过每条数据的 pid 去obj中查询
          let parentList = obj[list['pid']]
       
          if (parentList) {
            // 根据 pid 找到的是父节点，list是子节点，
            if (!parentList['children']) {
              parentList['children'] = []
            }
            // 将子节点插入 父节点的 children 字段中
            parentList['children'].push(list)
          } else {
            // pid 找不到对应值，说明是根结点，直接插到根数组中
            res.push(list)
          }
        }
       
        return res
      }
}