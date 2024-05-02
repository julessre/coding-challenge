default: install run

build:
	yarn vite build

run:
	yarn vite

install:
	yarn install

clean:
	rm -rf vendor
	rm -rf node_modules

test:
	yarn vite build
