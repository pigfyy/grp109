Group Assignment 109

For the purpose of sharing a consistent "theming" across pages, we'll use the following style guide:

- Pages should use HTML5 tags when possible. Primarily, pages need a `<header>`, `<main>`, and `<footer>`
- The following color scheme should be followed when possible:
  - Foreground elements: #FAF9F7 ![#FAF9F7](https://placehold.co/15x15/FAF9F7/FAF9F7.png)
  - Background elements: #A8AF00 ![#A8AF00](https://placehold.co/15x15/A8AF00/A8AF00.png)
  - Headers/Footers: #58314A ![#58314A](https://placehold.co/15x15/58314A/58314A.png)
  - Highlights: #764F36 ![#764F36](https://placehold.co/15x15/764F36/764F36.png) or #D7AF54 ![#D7AF54](https://placehold.co/15x15/D7AF54/D7AF54.png)
- Most likely, you'll want to include the universal CSS with `html <link rel="stylesheet" href="../universal.css" type="text/css">`

- The header's HTML content should be similar to:

```html
<header>
  <h1>Page Title</h1>
  <nav>
    <ul>
      <li><a href="/grp109/pizza/home/">Home</a></li>
      <li><a href="/grp109/pizza/change-log/">Change Log</a></li>
      <li>
        <a href="/grp109/pizza/validation-tracker/">Validation Tracker</a>
      </li>
      <li><a href="/grp109/members/">Team Members</a></li>
    </ul>
  </nav>
</header>
```

- The footer's HTML content should be similar to:

```html
<footer>
  <p>&copy; 2025 Artisanal Slice. All rights reserved.</p>
  <!--Footer found at the bottom of most pizza websites-->
  <!--W3C validator footer-->
  <div style="text-align:center;">
    <a
      href="https://jigsaw.w3.org/css-validator/"
      target="_blank"
      alt="W3 Validator"
    >
      <img
        src="http://jigsaw.w3.org/css-validator/images/vcss-blue"
        alt="Valid CSS!"
      />
    </a>
    <a href="http://validator.w3.org/check?uri=referer">
      <img
        src="http://www.w3.org/Icons/valid-xhtml10"
        alt="Valid XHTML 1.0 Strict"
      />
    </a>
  </div>
</footer>
```

These will both change over time, for example, to include the company name and logo
