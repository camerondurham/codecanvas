all: brief

brief: 
	@echo "\nUse make npm-start to install dependencies and serve on http://localhost:80"
	@echo "\nUse make clean-modules to get rid of the node_modules folder, just in case" 
	@echo "\nUse make serve in order to serve on http://localhost without installing dependencies"
	@echo 

npm-start:
	npm run start 

serve:
	python3 -m http.server 80

.PHONY: clean-modules

clean-modules:
	rm -rf ./node_modules/
