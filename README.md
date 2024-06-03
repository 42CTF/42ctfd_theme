# 42CTF Theme

Rewritten version of the CTFd core theme to use Bootstrap 5, Alpine.js, and vite to improve upon the existing CTFd theme structure. 

## Subtree Installation

### Add repo to themes folder

```
git subtree add --prefix CTFd/themes/42ctf git@github.com:42CTF/42ctfd_theme.git main --squash
```

### Pull latest changes to subtree
```
git subtree pull --prefix CTFd/themes/42ctf git@github.com:42CTF/42ctfd_theme.git main --squash
```

### Subtree Gotcha

Make sure to use Merge Commits when dealing with the subtree here. For some reason Github's squash and commit uses the wrong line ending which causes issues with the subtree script: https://stackoverflow.com/a/47190256. 
