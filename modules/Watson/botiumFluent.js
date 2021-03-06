module.exports = {
	runWatsonFlow: function executeWatsonFlow(){
		
		const fs = require('fs')
	
		const BotDriver = require('botium-core').BotDriver
		const Capabilities = require('botium-core').Capabilities
		const Source = require('botium-core').Source
		var TestData = 'testdata/watson';
		const driver = new BotDriver()
			.setCapability(Capabilities.PROJECTNAME, 'IBM Watson Conversation Sample')
			.setCapability(Capabilities.CONTAINERMODE, 'watsonconversation')
			.setCapability(Capabilities.WATSONCONVERSATION_USER, '0274cb6f-3680-4cf7-bd6b-71c7f447542d')
			.setCapability(Capabilities.WATSONCONVERSATION_PASSWORD, 'ZWDE5xo02sby')
			.setCapability(Capabilities.WATSONCONVERSATION_WORKSPACE_ID, '97513bc0-c581-4bec-ac9f-ea6a8ec308a9')
			.setCapability(Capabilities.WATSONCONVERSATION_COPY_WORKSPACE, false)
			
		const compiler = driver.BuildCompiler()
		compiler.ReadScriptsFromDirectory(TestData)
			
		compiler.ExpandConvos()
		compiler.convos.forEach((convo) => console.log(convo.toString()))
	
		driver.BuildFluent()
			.Start()
			.ReadScripts(TestData)
			.RunScripts()
			.Exec()
			.then(() => {
			console.log('')
				console.log('SUCCESS: Had a successful Conversation')
				
				var createJSON = require("./Reports/createJSON.js");
			createJSON.createData("Ok, let's go to the restaurant at 8:00 PM, on Thu, 24 May 2018.","Ok, let's go to the restaurant at 8:00 PM, on Wed, 16 May 2018.","Pass");
			//createJSON.createData(errmes,errmes,"Pass");  //Use this once we have BOT request and response in a variable
				
			var reports = require("./Reports/Report.js");
			reports.runReports();
			
			})
			.catch((err) => {
			console.log('')
			console.log('FAILURE')
			console.log('')
				console.log('ERROR: ', err)
				var createJSON = require("./Reports/createJSON.js");
			var errmes = err.message;
			createJSON.createData("Ok, let's go to the restaurant at 8:00 PM, on Thu, 16 May 2018.","Ok, let's go to the restaurant at 8:00 PM, on Thu, 24 May 2018.","Fail");
			//createJSON.createData(errmes,errmes,"Fail"); //Use this once we have BOT request and response in a variable
		
				var reports = require("./Reports/Report.js");
			reports.runReports();
			})
	}
	}