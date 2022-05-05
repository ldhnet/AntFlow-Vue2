export default {
    start: {
      type: "start",
      content: "所有人",
      properties: { title: '发起人', initiator: 'ALL' },
      buttons: {
            approvalPage: [2],
            startPage: []
        },
    },
    approver: {
      type: "approver",
      content: "请设置审批人",
      properties: { title: '审批人' },
      nodeProperty: 5,
	  name: "张明然审批",
	  annotation: "张明然审批",
	  buttons: {
	  approvalPage: [3]
			},
			isSignUp: 0,
			property: {
				configurationTableType: 1,
				tableFieldType: 2,
				signType: 1
			},
			nodePropertyName: "关联业务表",
    },
    copy:{
      type: 'copy',
      content: '发起人自选',
      properties: {
        title: '抄送人',
        menbers: [],
        userOptional: true
      }
    },
    condition: {
      type: "condition",
      content: "请设置条件",
      properties: { title: '条件', conditions: [], initiator: null },
      property: {
        conditionsConf: {
            sort: 0,
            accountType: [1]
        }
      },
    },
    gateway: { 
        type: "gateway", 
        content: "", 
        properties: {} 
    },
    branch: { type: "branch", content: "", properties: {} },
    empty: { type: "empty", content: "", properties: {} },
   
  }