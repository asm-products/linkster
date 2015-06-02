# linkster https://linkster.meteor.com

<a href="https://assembly.com/linkster/bounties?utm_campaign=assemblage&utm_source=linkster&utm_medium=repo_badge"><img src="https://asm-badger.herokuapp.com/linkster/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>
# Summary
linkster is an ultimate space to store important links and avoid tabs eating up your browser window. 
With linkster you can order your links in different collections and add a comment to each of the links.

# Building pieces
The project is built using MongoDB and the power of Meteor together with AngularJS and Material Design on the front-end, in TypeScript. If you're not familiar with one or any of these technologies, don't despair. Take this as an opportunity to learn something new. Getting started is really easy and can be done from Windows, Mac and Linux.

# How to contribute

There are 2 possibilities:

1. Use vagrant and the vagrant file, which is in the repository. Just write `vagrant up` and you can check out the application at http://localhost:3000 If you need to install additional packages, open a new terminal in the same folder run `vagrant ssh` and `cd /vagrant` and you can use all documented meteor commands. In case meteor crashes during the development, you can restart it with `vagrant reload`

2. If you want to, or have to, work directly on your machine, go ahead and install the few necessary tools, it is easy.

- Meteor, you can get it for Windows, Mac and Linux (https://www.meteor.com/install)
- NodeJS - again, available on all 3 platforms, either from https://nodejs.org/download/ or via command line, what ever you prefer
- Now you'll need the TypeScript compiler. Additionally I also strongly suggest you to get tsd and bower. Although we don't use bower at the time of this writing, yet, anywhere, it might be easily introduced in the future and having it, will prevent you from getting any problems. tsd is a tool, you'll find handy, when you'll want to add new packages to the project. You can get all the tools with one command (run it optionally with sudo, if that is required for you):

npm install -g typescript tsd bower

For development, I suggest you either Visual Studio Code, Sublime Text with TypeScript plugin, or Atom with the TypeScript plugin. All of these editors have advantages and disadvantages, and all of them work on the 3 major platforms.

Personally I'm using Visual Studio Code.

Now, we're waiting for your ideas and contribution, good to see you :)

This is a product being built by the Assembly community. You can help push this idea forward by visiting [https://assembly.com/linkster](https://assembly.com/linkster).

### How Assembly Works

Assembly products are like open-source and made with contributions from the community. Assembly handles the boring stuff like hosting, support, financing, legal, etc. Once the product launches we collect the revenue and split the profits amongst the contributors.

Visit [https://assembly.com](https://assembly.com) to learn more.
