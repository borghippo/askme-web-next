# The Next site on Jetstream

How to get the AskMe website to run on Jetstream.

Requirements:

- An Ubuntu 22.04 instance.
- The AskMe API running somewhere.


## Installing Node.js

The code depends on npm version 9.8.1 and Node.js version v20.6.1 (lower minor versions may work).

One default way to install npm and node is the following (where installing npm will actually also install node):

```bash
$ sudo apt install npm
$ sudo apt install nodejs
```

However, this installs npm 8.5.1 and node v12.22.9. And doing the suggested `sudo apt-get update` and `sudo apt-get upgrade npm` did not achieve anything.

On various webpages there are some musings on how apt-get is not so great for dealing with Node.js and to use nvm at [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm). The instructions there have you run an install script and set an environment variable:

```bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
$ export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

The former does also add the latter to `/home/ubunstu/.bashrc`. And at that point you can finally install a more recent version of Node.js on your Jetstream instance:

```bash
$ nvm install 20.2.0
$ node -v
v20.2.0
```


## Running the Next.js site

First clone the repository:

```bash
$ git clone https://github.com/lappsgrid-incubator/askme-web-next
```

Now you need to create and/or edit the environment file `.env.local`. Assuming the API runs on the local IP address 10.0.142.4 (as it did on April 11th 2024), the content of that file should be:

```
ASKME_API=http://10.0.142.4:8000
```

At some point I would like to be able to use something like api.askme.lappsgrid.org.

Starting the site is as advertized in the README file of the repository:

```bash
$ npm install
$ npm run build
$ npm run start &
```

This runs on localhost, but the site is also available on the public address at [http://149.165.171.36:3000/](http://149.165.171.36:3000/).

If you want to stop the site you can get the process id and then kill it:

```bash
$ lsof -nPi -sTCP:LISTEN
COMMAND      PID   USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
next-rout 147862 ubuntu   20u  IPv6 1235716      0t0  TCP *:3000 (LISTEN)
$ kill -9 147862
```


### A more robust way to run the site

The above feels a bit flimsy. I would like to use something like systemctl here. There is a post by Jerry Satpathy in [dev.to](https://dev.to/j3rry320/deploy-your-nextjs-app-like-a-pro-a-step-by-step-guide-using-nginx-pm2-certbot-and-git-on-your-linux-server-3286) that was helpful here. That post also includes installing Nginx, but that does not appear to be needed for our purposes. It uses PM2, which manages your Node.js applications. To install PM2 globally use `npm`:

```bash
ubuntu@next-test:~$ npm install -g pm2
ubuntu@next-test:~$ npm list -g
/home/ubuntu/.nvm/versions/node/v20.2.0/lib
├── corepack@0.17.2
├── npm@9.6.6
└── pm2@5.4.2
```

Note that corepack and npm were already installed. Now you can start the site with the `pm2` command (some of the more verbose aspects of the dribble to the terminal are deleted):

```
ubuntu@next-test:~/askme/code/askme-web-next$ pm2 start npm --name "askme-web" -- start
[PM2] Spawning PM2 daemon with pm2_home=/home/ubuntu/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /home/ubuntu/.nvm/versions/node/v20.2.0/bin/npm in fork_mode (1 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ askme-web          │ fork     │ 0    │ online    │ 0%       │ 37.3mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

Once you have started the site like this, PM2 will automatically restart your application if it crashes. You can stop the site with `pm2 stop askme-web` and delete it with `pm2 delete askme-web`. You can get a process listing with `pm2 ps`.

> I am sure how exactly this works. We are not using a standard PM2 invocation like `pm2 start app.js`. When you do `pm2 start npm` you are really doing "npm start" within the PM2 context, so figuring out how the latter works is all that is needed. And "npm start" (or "npm run start", which is the same) actually calls "next start" (as specified in the package.json file), but "next" is not recognized as a command from the terminal. In any case when starting via npm you are assuming there is an npm project available and the code probably knows where to look for the js files by virtu of the project structure (it may use files like `.next/server/pages/_app.js` for all I know).

Some links for PM2:

- [http://pm2.io/](http://pm2.io/)
- [https://pm2.io/docs/runtime/guide/process-management/](https://pm2.io/docs/runtime/guide/process-management/)
- [https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- [https://pm2.keymetrics.io/docs/usage/process-management/](https://pm2.keymetrics.io/docs/usage/process-management/)


## Using Docker

To be written.
