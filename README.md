Group Assignment 109

The following is a style guide for making a new page. These don't need to be exactly followed, but it helps to keep a consistent and maintanable codebase:

1. You'll likely want to include the universal CSS, using the following in the head
```html
<link rel="stylesheet" href="/css/pizza/universal.css">
```

2. Each page should have the header. This is built in to the universal JS, so you can simply include the following anywhere in your body and it should be automatically appended as the first element. You'll also need the universal CSS
```html
<script src="/js/universal.js"></script>
```
3. The bulk of the page should be contained in a `<main>` tag. Otherwise it will be obstructed by the header

4. Pages should have the following credit at the top:
```html
<!--<Page purpose>. Created by <creator>
    All pages are a group effort and have multiple contributors -->
```