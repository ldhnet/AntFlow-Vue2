  
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray( data ) ? data.length === 0 : true

export class FormatUtils {
     /**
   * 解析Node Tree Data 数据
   * @param { Object } treeData - 节点数据
   * @returns Array
   */
    static depthMapTree (treeData) {
        console.log('treeData====',JSON.stringify(treeData)); 
        let  arrList=[];
        let  node = createNode(treeData);
        arrList.push(node);
        if(!isEmpty(treeData.childNode))
        {
            this.depthMapChildNode(treeData.childNode,arrList); 
        }
        if(!isEmptyArray(treeData.conditionNodes))
        {
            this.depthMapConditionNodes(treeData.conditionNodes,arrList);
        }  
        console.log('arrList-length-2',arrList.length);
        console.log('arrList-2',JSON.stringify(arrList)); 
        return arrList
    }

    /**
   * 递归解析node中的childNode 节点
   * @param { Object } data - 节点数据 
   */
    static depthMapChildNode (data,arrList) { 
        let  node = createNode(data);
        arrList.push(node);  

        if(!isEmpty(data.childNode))
        {
            this.depthMapChildNode(data.childNode,arrList);
        }
        if(!isEmptyArray(data.conditionNodes))
        {
            this.depthMapConditionNodes(data.conditionNodes,arrList);
        }
      
    }
    /**
   * 递归解析node中的conditionNodes 节点
   * @param { Object } data - 节点数据 
   */
    static depthMapConditionNodes (data,arrList) {    
        for(let i in data)
        {
            let  node = createNode(data[i]);    
            arrList.push(node); 
            if(!isEmpty(data[i].childNode))
            { 
                this.depthMapChildNode(data[i].childNode,arrList);
            }
        }
    } 
}  
  /**
   * 创建节点
   * @param { Object } nodeinfo - 节点 
   * @returns Array
   */
const createNode = (nodeinfo)=>{
    let  node = {
        nodeType:nodeinfo.type,
        tempName:nodeinfo.content,
        nodeId:nodeinfo.nodeId,
        prevId:nodeinfo.prevId,
        nodeFrom:nodeinfo.nodeFrom,
        nodeTo:nodeinfo.nodeTo,
    }; 
    return node;
}
    
// const isConditionNode =  ( node )=> {
//     return node && node.nodeType === 'condition'
//   }