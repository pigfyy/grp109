/* universal js */
/*  JS shared by all pages. Created by Ashton, edited by Esal
    All pages are a group effort and have multiple contributors -->

/* Creates a header we can use for every page */
let header = document.createElement('header');
header.innerHTML = `
<div>
    <h1>Artisanal Slice</h1>
    <h3>You've had the best, now try second place</h3>
</div>
<nav>
    <ul>
        <li><a href="../pizza/">Home</a></li>
        <li><a href="../pizza/home/">Menu</a></li>
        <li><a href="../pizza/change-log/">Change Log</a></li>
        <li><a href="../pizza/validation-tracker/">Validation Tracker</a></li>
        <li><a href="../members/">Team Members</a></li>
    </ul>
</nav>
`;

/* Creates a footer we can use for every page */
let footer = document.createElement('footer');
footer.innerHTML = `
<p>&copy; 2025 Artisanal Slice. All rights reserved.</p>
<!--Footer found at the bottom of most pizza websites-->
<!--W3C validator footer-->
<div style="text-align: center">
    <a href="https://jigsaw.w3.org/css-validator/" target="_blank" alt="W3 Validator">
        <img src="http://jigsaw.w3.org/css-validator/images/vcss-blue" alt="Valid CSS!"/>
    </a>
    <a href="http://validator.w3.org/check?uri=referer">
        <img src="http://www.w3.org/Icons/valid-xhtml10" alt="Valid XHTML 1.0 Strict"/>
    </a>
</div>
`;

/*  Cycles through each link and adds a specific CSS class to
    the current one */
header.querySelectorAll('a').forEach(link => {
    if (link.pathname == window.location.pathname) {
        link.parentElement.classList.add('active-url');
    }
})

/*  Adds the header as the first element under the body tag.
    This is a major QOL fix for us, as we previously had a
    new, identical, header for every page */
document.body.prepend(header);

/*  Adds the footer as the final element under the body tag.
    This is a similar QOL fix */
document.body.append(footer);
