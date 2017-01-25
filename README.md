# MetawidetA2
A2-Metawidget code base

Download file:

	1. Either download as zip file, extract it to a folder.
	2. Or clone the repo to get the project into local-system.

Overview:

A2 wiredup with Systemjs.config.js, tsconfig.json & typings.json default configurions which is necessary to run the A2 app. Whereas package.json adds the dependencies to MW-Component.
This incubation, can also be configured with valid Webpack config also. This has the basic MW-Pipeline configured can be extended in further releases.
App starts from the index.html, can be found in the root folder. Core package contains all necessary metawidget-dependencies(core-js files).
We have followed the TypeScript compiler.


Starting the project:

	1. Navigate to the .../MW-A2 directory and execute command: npm install
	2. Execute the command: npm start , once installation of all the dependencies are done.
NB: Node.js has to be installed to execute the commands.
	
This will start with the sample FORM being generated. Usage is explaind below:

	1. "app.component.ts" is the initiated component.
	2. Selector: "<metawidget [(schemaConfiguration)]="schemaConfiguration" [(model)]="model" ></metawidget>", within the template will call the compiled MetaWidget component.
	3. Overriden widgetProcessor can be found from the package "widgetprocessor", auto-compile of modifications on the .ts file will be reflected.
	4. pipeline-configuration can be found on the metawidget.component.ts
	5. Dynamic component.service #TODO {A2-specific}