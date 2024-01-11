# Tmux X VS Code

My `.zshrc` is configured so shell automatically starts a default tmux session.
This makes my terminal state not attached to a particular iTerm window.
But when opening terminal in an IDE having a tmux session is normally a bug than a feature.
Because of this, I was surprised to find a reasonably nice workflow while working in VS Code with this "bug/feature".

I can use the terminal from VSCode window to experiment with some code changes.
But then if that experiment ends up taking a bit more time, I can easily switch to a full terminal window, while maintaining the same state.

Example use-case:

1. While working on the code, I'm curious about the behaviour of a particular class
2. In VSCode window I open terminal and run ipython.
3. There I load the class and run a couple of commands.
4. Then I wonder how would the class handle a different text input.
5. So I open it in iTerm, 
6. In iTerm, I split the tmux session into two panes, load the text in one and paste it into the Python repl in the other.
