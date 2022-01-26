# design

Implementation details and notes for development.


### Components

#### backend

1. runtime engine: executes the user's code on the server, handles security, compiles, and return code output
2. internal server api: handles job execution 'scheduling', pre/post hooks and transforming input into language specific compile commands
3. external api: the api that can be accessed externally where user provides (ideally) just the language and snippet of code to run

For #2, there are some different options to consider:

**Monolithic Architecture:** internal server API can be another module

Pros:

- monoliths *can be* much faster since tight integration can help toward optimizing for performance (citaion: [stackoverflow.com scaling](https://www.infoq.com/news/2015/06/scaling-stack-overflow/))
- easier to implement and debug
- simpler to reason about

Cons:

- tight integration means small changes can break/disrupt everyones work
- higher possibility of merge conflicts
- cannot horizontally scale, must replace the monolith with bigger VM/containers to scale up

**Microservice Architecture:** internal server API is a separate service, another container.

Pros:

- external server can be any language and communicate with simple REST interface (will use internal private network with minimal noise/traffic)
- can be easily placed behind a load balancer and scale horizontally
- distinct modules in codebase minimize merge conflicts and make it easier to test each unit individually

Cons:

- more difficult to reason about, more moving pieces
- adding 2-layers of network calls may introduce other unknown complexities
- possibly harder to implement and debug

#### frontend

1. [PRIORITY] command line interface: CLIs make this somewhat easier to test end-2-end
2. [PRIORITY] browser: would like to have a nice looking website to show this off!
3. VSCode extension: let users write code and pass it off to our server to acually run it, this might be a stretch goal



### Daemon API Design

Provides execute access into code runner container.

#### input

**option 1**

1. setup commands to run (copy user code in)
2. path to use as filesystem (prepared directory to use as "root")
3. command to execute (compile and/or run command e.g `g++ --std=c++11 main.cpp -o main` or `python3.9 main.py`)

**option 2**

1. file to copy in
2. commands to execute

#### output

1. stdout
2. stderr
3. exit code

### Server API Design

### Client API Design


### security

#### linux syscalls

- [prlimit](https://man7.org/linux/man-pages/man1/prlimit.1.html): get and set process limits
- [timeout](https://man7.org/linux/man-pages/man1/timeout.1.html): run a command with a time limit
- [pivot_root](https://man7.org/linux/man-pages/man8/pivot_root.8.html): change the root filesystem
- [chroot](https://man7.org/linux/man-pages/man2/chroot.2.html): change root directory (also see https://superuser.com/questions/1575316/usage-of-chroot-after-pivot-root)

## whiteboarding

![](../assets/runner-diagram-details-bg.png)
