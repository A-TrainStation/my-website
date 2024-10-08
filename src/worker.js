import { Hono } from 'hono';
import { html } from 'hono/html';

// Bootstrap change
const _navbardef = [
    { title: 'index', href: '/', type: 'Home' },
    { title: 'biography', href: '/bio', type: 'about' },
    { title: 'Career-goals', href: '/goals', type: 'career-goals' },
    { title: 'Activities-organization', href: '/engagement', type: 'activities-organization' },
    { title: 'Images', href: '/gallary', type: 'images' },
    { title: 'AI', href: '/ai', type: 'AI' },
    { title: 'POEMS', href: '/poems', type: 'POEMS' },
    { title: 'Movies', href: '/movies', type: 'MOVIES' },
];
const app = new Hono();

const currentAge = (birthdate) => {
    const current = new Date();
    const birth = new Date(birthdate);
    const age = (current - birth) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(age);
};

console.log(currentAge('1997-11-19'));



function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

class Page {
    static getStyleObject(style) {
        const styleTypes = {
            home: {
                header: { background_color: '000' },
                body: { background_color: 'e0ebeb', text_color: 'ccf5ff' },
            },
            greenlantern: {
                header: { background_color: 'ccffdd' },
                body: { background_color: 'e0ebeb', text_color: 'ccf5ff' },
            },
            purplecrayon: {
                header: { background_color: 'ccffdd' },
                body: { background_color: 'f7e6ff', text_color: 'ccf5ff' },
            },
            blueberry: {
                header: { background_color: 'ccffdd' },
                body: { background_color: 'b3f0ff', text_color: 'ccf5ff' },
            },
            yellowflower: {
                header: { background_color: 'ccffdd' },
                body: { background_color: 'e0ebeb', text_color: 'ccf5ff' },
            },
            default: {
                header: { background_color: '000', text_align: 'center' },
                body: { background_color: 'e0ebeb', text_color: 'fff' },
            },
        };
        return styleTypes[style] || styleTypes['default'];
    }

    static defaults = {};
    static defaultKeysAllowed = ['header', 'footer', 'banner', 'body', 'navbar'];
    static setDefs = (setDefaults) => {
        for (const [key, value] of Object.entries(setDefaults)) if (Page.defaultKeysAllowed.includes(key)) Page.defaults[key] = value;
    };
    static buildNavbar(navObj) {
        let output = '';
        for (const each of navObj) {
            output += `<a class="nav-link" href="${each.href}">${each.title}</a>`;
        }

        return `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-center">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">A-Train-Station!</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        ${output}
                    </ul>
                </div>
            </div>
        </nav>
        `;
        
    }

    constructor(args) {
        this.navbar = args.navbar || [];
        this.style = args.style || {};
        this.title = args.title || '';
        this.body = args.body || '';
        this.header = args.header || '';
        this.footer = args.footer || '';
        this.backgroundColor = args.backgroundColor || '#Fddfed';
        this.topButton = args.topButtonText || 'Top Button';
    }

    get navbar() {
        return this._navbar.length ? Page.buildNavbar(this._navbar) : Page.defaults.navbar || '';
    }

    set navbar(navbarArr) {
        this._navbar = navbarArr;
    }

    get topButton() {
        return `<button onclick="topFunction()" id="topButton" title="${this._topButtonText}">${this._topButtonText || 'Top Button'}</button>`;
    }

    set topButton(topButtonText) {
        this._topButtonText = topButtonText;
    }

    get style() {
        const style = this._style;
        return `
        header {
            background-color: #${style.header.background_color};
            color: #${style.header.text_color};
            padding: 10px 0;
            text-align: ${style.header.text_align};
        }
        body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #${style.body.background_color};
        }
        footer {
            text-align: center;
        }
        h2 {
            text-align: center;
            margin-right: 30px;
            margin-left: 30px;
        }
        .navbar-nav {
            flex-direction: row; /* Default direction for larger screens */
        }
        /* Media queries for different screen sizes */
        /* Extra small devices (phones, less than 576px) */
        @media (max-width: 575.98px) {
            .navbar-nav {
                flex-direction: column; /* Stack vertically on very small screens */
            }
            .navbar-toggler {
                display: block; /* Ensure the hamburger menu is visible */
            }
        }
        /* Small devices (phones, 576px and up) */
        @media (min-width: 576px) and (max-width: 767.98px) {
            .navbar-nav {
                flex-direction: column; /* Stack vertically on small screens */
            }
            .navbar-toggler {
                display: block; /* Ensure the hamburger menu is visible */
            }
        }
        /* Medium devices (tablets, 768px and up) */
        @media (min-width: 768px) and (max-width: 991.98px) {
            .navbar-nav {
                flex-direction: row; /* Horizontal layout for tablets */
            }
            .navbar-toggler {
                display: none; /* Hide the hamburger menu on tablets */
                touch-action: manipulation;
            }
        }
        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
            .navbar-nav {
                flex-direction: row; /* Horizontal layout for larger screens */
            }
            .navbar-toggler {
                display: none; /* Hide the hamburger menu on desktops */
            }
        }
        /* Landscape orientation for mobile devices */
        @media (orientation: landscape) and (max-width: 768px) {
            .navbar-nav {
                flex-direction: column; /* Stack vertically on landscape mode */
            }
            .navbar-toggler {
                display: block; /* Ensure the hamburger menu is visible */
            }
        }
        /* Portrait orientation for mobile devices */
        @media (orientation: portrait) and (max-width: 768px) {
            .navbar-nav {
                flex-direction: column; /* Stack vertically on portrait mode */
            }
            .navbar-toggler {
                display: block; /* Ensure the hamburger menu is visible */
            }
        }
        /* Style for the top button */
        #topButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
        }
        #topButton:hover {
            background-color: #0056b3;
        }
        
        
        
        `;
    }

    set style(args) {
        let styleArgs = args;
        if (styleArgs.primaryColor) {
            styleArgs = {
                header: { background_color: args.primaryColor },
                body: { background_color: args.primaryColor, text_color: args.primaryColor },
            };
        }
        const styledef = Page.getStyleObject('default');
        const merge = mergeDeep(styledef, styleArgs);
        this._style = merge;
    }

    get header() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${this.title}</title>
            ${this._header || Page.defaults.header}
        </head>`;
    }

    set header(header) {
        this._header = header;
    }

    get body() {
        const banner = Page.defaults.banner || '';
        const body = this._body || Page.defaults.body || '';
        const navbar = this.navbar;
        return banner + navbar + body;
    }

    set body(content) {
        this._body = content;
    }

    get footer() {
        return this._footer || Page.defaults.footer || '';
    }

    set footer(content) {
        this._footer = content;
    }

    render() {
        return this.header + this.body + this.footer + this.topButton;
    }
}

const pageDefaults = {
    header: `
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

        <!-- Font Awesome for icons -->
        <script src="https://kit.fontawesome.com/2101804b79.js" crossorigin="anonymous"></script>

        <!-- Custom CSS -->
        <link href="https://a-trainstation.github.io/css/bs.add.css" rel="stylesheet">

        <!-- Viewport meta tag for responsive design -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Bootstrap JS Bundle (for responsive navbar) -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    `,
    banner: `
        <header class="bg-dark text-white text-center py-3">
            <h1 id="banner-text">Life of Alexander Meiners</h1>
        </header>
    `,
    footer: `
        <footer class="footer mt-3 py-3 glass">
            <div class="container text-center">
                <h2>Let's Keep in Contact!</h2>
                <div class="contact-info">
                    <a href="mailto:alexandergregm25@gmail.com"><i class="fa fa-envelope" aria-hidden="true"></i><span class="sr-only">alexandergregm25@gmail.com</span></a>
                    <a href="https://a-trainstation.github.io/AlexM/"><i class="fa fa-github" aria-hidden="true"></i><span class="sr-only">yourwebsite.com</span></a>
                    <a href="https://twitter.com/ATrainMeiners"><i class="fa fa-twitter" aria-hidden="true"></i><span class="sr-only">Twitter</span></a>
                    <a href="https://www.linkedin.com/in/alex-meiners-209851288"><i class="fa fa-linkedin" aria-hidden="true"></i><span class="sr-only">LinkedIn</span></a>
                    <a href="https://www.facebook.com/profile.php?id=100007566049250&mibextid=LQQJ4d"><i class="fa fa-facebook" aria-hidden="true"></i><span class="sr-only">Facebook</span></a>
                </div>
            </div>
        </footer>
    `,
    navbar: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">A-Train-Station!</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        ${_navbardef.map(item => `
                            <li class="nav-item">
                                <a class="nav-link" href="${item.href}">${item.title}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </nav>
    `,
};

// Assuming Page.setDefs is a method to set default configurations
Page.setDefs(pageDefaults);


// Express route handler for root
app.get('/', async (c) => {
    const htmlContent = `
        <div class="container">
            <div class="row">
                <!-- Profile Image Column -->
                <div class="col-md-3">
                    <div class="Images" style="margin-bottom: 30px;">
                        <img class="profile-img d-block m-3" alt="Profile-image" src="https://raw.githubusercontent.com/A-TrainStation/Images/main/IMG_2449.JPG" style="max-width: 200px; height: auto; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);">
                    </div>
                    <div class="contact-info">
                        <a href="mailto:alexandergregm25@gmail.com"><i class="fa fa-envelope" aria-hidden="true"></i><span class="sr-only">alexandergregm25@gmail.com</span></a>
                        <a href="https://a-trainstation.github.io/AlexM/"><i class="fa fa-github" aria-hidden="true"></i><span class="sr-only">yourwebsite.com</span></a>
                        <a href="https://twitter.com/ATrainMeiners"><i class="fa fa-twitter" aria-hidden="true"></i><span class="sr-only">Twitter</span></a>
                        <a href="https://www.linkedin.com/in/alex-meiners-209851288"><i class="fa fa-linkedin" aria-hidden="true"></i><span class="sr-only">LinkedIn</span></a>
                        <a href="https://www.facebook.com/profile.php?id=100007566049250&mibextid=LQQJ4d"><i class="fa fa-facebook" aria-hidden="true"></i><span class="sr-only">Facebook</span></a>
                    </div>
                    <h2>CONTACT ME</h2>
                    <form id="contactForm" style="display: flex; flex-direction: column; align-items: flex-start;" method="post" action="/">
                        <label for="name"> Name</label>
                        <input type="text" id="name" name="name" style="margin-bottom: 10px;">
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email" style="margin-bottom: 10px;">
                        <fieldset style="border: none; margin-bottom: 10px; padding: 10px 0;">
                            <legend>Would you like to read my book? </legend>
                            <input type="radio" id="yes" name="book" value="yes">
                            <label for="yes"> Yes</label>
                            <input type="radio" id="no" name="book" value="no">
                            <label for="no"> No</label>
                        </fieldset>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>             
                </div>
                
                <!-- Body Content Column -->
                <div class="col-md-9">
                    <div>
                        <h1>There Is A Book Inside Everyone's Life!</h1>
                        <p>
                            Hi Everyone! Welcome to my website. My name is Alexander Meiners, and I’m thrilled to have you here. 
                            My journey has been quite an adventure, beginning with my time as a student at Indian Hills Community College, 
                            where I initially focused on Business and Marketing.
                            Life, however, has its own way of writing stories, and mine took an unexpected turn.
                            After exploring the world of business and real estate, I discovered a new passion for computer software development. 
                            This transition was driven by a fascination with technology and a desire to create innovative solutions. 
                            As a professional writer and software developer, my life has become a narrative filled with diverse experiences and challenges that reflect my commitment to growth and exploration. 
                            While my future was once uncertain and veered from my original expectations, I found my way through relentless hard work, unwavering perseverance, and a steadfast determination to achieve my dreams. 
                            Each chapter of my journey, from business to technology, is a testament to overcoming obstacles and seizing opportunities. 
                            I’m excited to share these experiences with you and demonstrate how embracing change can lead to fulfilling new paths. 
                            Thank you for visiting my site, and I hope my story resonates with you and inspires you to embrace your own narrative with hope, courage, and an openness to new possibilities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    const page = new Page({ navbar: _navbardef, title: 'home', body: htmlContent });
    return c.html(page.render());
});


app.post('/', async c => {
    const { name, email, book } = await c.req.parseBody();

    // Create a custom message using destructured variables
    const message = `Hello Alex,

You have received a new book request!

Name: ${name}
Email: ${email}
Book Requested: ${book}

Best regards,
Your App`;

    // Use the destructured variables in your API call or other logic
    const response = await fetch('https://api.sparkpost.com/api/v1/transmissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'e946110b2cafe1c2f580f775d7a8bf60bbb82978' },
      body: JSON.stringify({ 
        options: { sandbox: false }, 
        content: { 
          from: 'alex@a-train-station.com', 
          subject: 'New Book Request Received', 
          text: message // Using the custom message
        }, 
        recipients: [{ address: 'alex@a-train-station.com' }] 
      })
    });

    console.log(await response.json());
    return c.redirect('/');
});


app.post('/', async c => {
    const { name, email, book, notify } = await c.req.parseBody();

    // Check if the user wants to be notified
    if (notify) {
        // Create a custom message using destructured variables
        const message = `Hello Alex,

You have received a new book request!

Name: ${name}
Email: ${email}
Book Requested: ${book}

Best regards,
Your App`;

        // Use the destructured variables in your API call or other logic
        const response = await fetch('https://api.sparkpost.com/api/v1/transmissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'e946110b2cafe1c2f580f775d7a8bf60bbb82978' },
          body: JSON.stringify({ 
            options: { sandbox: false }, 
            content: { 
              from: 'alex@a-train-station.com', 
              subject: 'New Book Request Received', 
              text: message // Using the custom message
            }, 
            recipients: [{ address: 'alex@a-train-station.com' }] 
          })
        });

        console.log(await response.json());
    }

    return c.redirect('/');
});

app.get('/bio', async (c) => {
    const age = currentAge('1997-11-19');
    const htmlContent = `
    <style>
        /* Background Image */
        body {
            background-image: url('https://th.bing.com/th/id/OIP.X8u6NlTUirxxlGAYiiH7UwAAAA?rs=1&pid=ImgDetMain'); /* Background image URL */
            background-size: cover;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif; /* Font styling */
        }

        /* Glass Effect */
        .glass {
            background: rgba(255, 255, 255, 0.7); /* White with more opacity for better visibility */
            backdrop-filter: blur(10px); /* Blur effect */
            border-radius: 10px; /* Rounded corners */
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow */
        }

        /* Content Styling */
        .container {
            margin-top: 20px;
            padding: 20px;
        }

        .img-25 {
            margin: 10px;
        }

        #blog-image {
            width: 100%;
            margin: 10px 0;
        }

        .Pets img {
            width: 100%;
        }

        /* Text Styling */
        h1, h2, h3, h4, h5, p {
            color: #333; /* Dark color for better contrast */
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7); /* Light shadow for readability */
        }

        .glass h1, .glass h2, .glass h3, .glass h4, .glass h5 {
            color: #000000; /* Dark color for headers */
        }

        .p1, .p2, .p3 {
            margin-bottom: 20px;
        }
    </style>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div class="card glass mb-4">
                    <div class="card-body">
                        <h1>COUNTRY FLAG</h1>
                        <div class="row">
                            <div class="col-6 mx-auto">
                                <img class="shadow-lg img-25 d-block m-3 img-fluid rounded" style="width: 75%;" alt="India Nation Flag" src="https://flagcdn.com/w640/in.png">
                            </div>
                            <div class="col-6 mx-auto">
                                <img class="shadow-lg img-25 d-block m-3 img-fluid rounded" style="width: 75%;" alt="United States Of America" src="https://flagcdn.com/w640/us.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card glass mb-4">
                    <div class="card-body">
                        <h2>HISTORY</h2>
                        <p class="p1">My Name is Alexander Meiners and I am ${age} years from Mumbai, India. 
                            I was born on November 19th, 1997. I was Adopted at the age of 3 and 
                            live in Ottumwa, IA.</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card glass mb-4">
                    <div class="card-body">
                        <h2>Personal Growth</h2>
                        <p>Hi Everyone! Welcome to my page, here I will talk about my life, careers, achievements. Let’s get started. 
                            For those of you who are new to my LinkedIn, my name is Alexander Meiners 
                            or Alex, I am 26 years old from Ottumwa, IA.I am a Graduate from OHS, Class of 2016. GO BULLDOGS!  
                            I graduated with a 3.85 GPA, high academic achievement, honors student, concert band soloist. 
                            In years 2016-2017, I completed my A.A degree at IHCC and 
                            later went on to earn my Master’s Degree in Business Management & Marketing, M.A in 2018-2021.</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card glass mb-4">
                    <div class="card-body">
                        <h2>Occupations</h2>
                        <p>Jobs that I had throughout high school and after college consisted of: 
                            HY-VEE, Marketing, Business Administrator, Real Estate</p>
                        <p>Personal Life:
                            In my spare time I attend church on Sundays, I am an activities coordinator for the youth in my church. 
                            I love spending time with my Family, Friends, my amazing Girlfriend, plus my dogs. 
                            I enjoy watching sports, going on bike rides, rollerblading, Tennis and have a passion for writing.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card glass mb-4">
                    <div class="card-body">
                        <h3>CHILDHOOD</h3>
                        <p class="p2">When I was young, I was a rambunctious child and you wouldn't believe it, but
                            I was always into the sugar bowl, haha. Sports were a huge part of my life growing up,
                            at the age of 5 I played soccer, and rode my bike and I loved running. When growing up
                            I attended Eisenhower Elementary school, where I had the best of friends. My favorite part of school,
                            was outside recess, gym class, and lunch.</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card glass mb-4">
                    <div class="card-body">
                        <h4>SPORTS</h4>
                        <p class="p3">I am a huge sports fan, I love watching Hockey, some football, and college Sports.
                            One of my favorite sports teams is the Pittsburgh Penguins. Ever since I was a kid,
                            my favorite animal was a Penguin and when the Penguins had a pro sports team, I followed
                            the Pittsburgh Penguins ever since. In addition to Sports, my family and I love watching
                            NBA, NFL, Premier League and Formula 1 Racing.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card glass mb-4">
                    <div class="card-body">
                        <h5>FAMILY</h5>
                        <p>In my family I have 3 sisters and 1 brother and I am the second oldest.
                            We all lived in Iowa. Everyone enjoyed spending the holidays at Grandma and Grandpa's house.
                            The best part is our family reunions because we don't get to see our family all the time.
                            In my family, we play Wheel of Fortune game to see who does which chore during the week,
                            we enjoy playing board games, Friday Movie Nights, and playing outside. My Father,
                            brother and I have been working on outdoor projects and enjoy riding bikes.</p>
                        <p>I have 2 dogs, 2 cats.
                            My dogs' names are Lucky and Scooby. 
                            My cats' names are Molly and Milo.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <img id="blog-image" alt="blog-image" src="../Images/IMG_2083.JPG">
                                <img id="blog-image" alt="profile-image" src="../Images/IMG_2449.JPG">
                                <img id="blog-image" alt="blog-image" src="../Images/IMG_2270.JPEG">
                                <img id="Lucky" alt="dogs" src="../Images/IMG_2579.JPG">
                            </div>
                        </div>
    `;
    const page = new Page({ navbar: _navbardef, title: 'home', body: htmlContent });
    return c.html(page.render());
});




app.get('/goals', async (c) => {
	const htmlContent = ` <div class="container"> <h2>IHCC COMPUTER SOFTWARE DEVELOPMENT PROGRAM</h2>
            <P>I am studying Computer Software Development at IHCC, 2023-2025.
                The nice part about going to Indian Hills is that it close to home and very cheap.
        
                <script src="../Career.js"></script>
                <ul id="SkillsList"></ul>
            
                <button onclick="RetrieveDataFJson()">Retrieve Data</button>
                <div>
                    <h3>SKILLS</h3>
                    <ul>
                        <li>▪ Python</li>
                        <li>▪ Programming Logic</li>
                        <li>▪ Webpage Development</li> 
                        <li>▪ Employability skills</li>
                        <li>▪ Intro to computers</li>
                        <li>▪ JavaScript</li>
                        <li>▪ Java2</li>
                        <li>▪ Web Design</li>
                        <li>▪ Graphic User Interface</li>
                        <li>▪ PHP/APACHE/li>
                        <li>▪ INTERNSHIP CLASS</li>
                        <li>▪ Python/Data Structures</li>
                        <li>▪ Business Analysis</li>
                        <li>▪ Web Scripting</li>
                        <li>▪ Advance .NET</li>
                        <li>▪ Advance C#</li>
                        <li>▪ SQLite/DBMS</li>
                        <li>▪ Cloudflare</li>
                    </ul>
                </div>
                <div>
                    <h4>Class Projects</h4>
                    <ul>
                        <li>▪ C# Project BaseBall</li>
                        <li>▪ Webpage Development Personal Project</li> 
                        <li>▪ Employability skills building a Resume</li>
                        <li>▪ Intro to computers Powerpoint Travel Trip</li>
                        <li>▪ JavaScript OMDB Movie Database</li>
                        <li>▪ Java2 Nutrition Project or GUI </li>
                        <li>▪ Web Design Resume Project</li>
                    </ul>
                </div>
                
        <div class="Networking">
             <h4>NetWorking</h4>
            <p>Networking is a key point when working with Computers. 
                Computer Software Development has numerous opportunites in the industry.
                An old saying goes "Its not so much what you know, but Who you know."
                It may seem cliche, but Networking is very key when you know people, 
                they can help guide you to what you need to do next for a job.
                Earning a Masters degree in Business Marketing and Management, is one of my hightlight,
            </p>
        <div class="College Class">
            <h5>College Classes</h5>
            <p>Does this sound familiar? Well what do you know, It is August 28, 2023 and 
                I am in my 1st year at IHCC, taking on CSD. Computer Software Development is 
                one of those careers that takes patience, time and positivity. I am taking Python,
                with "Susan Wilson" and she is the nicest teacher you could ever ask for.
                In addition, I am studying Beginning Webpage Development, and who better else,
                to have as an instructor, "James Warner". I am learning so much about programming,
                coding, HTML, and CSS and all sorts of fun projects and lab units.  
            </p>
             <img class="img-25 d-block m-3 img-fluid rounded " style="width: 15%;" alt="Buena Vista" src="https://raw.githubusercontent.com/A-TrainStation/Images/main/buena%20vista.png">
            <table>
                <h6>Buena Vista University</h6>
                <tr>
                    <th>Buena Vista University</th>
                    <td>Years 2017 - 2021</td>
                </tr>
                <tr>
                    <th>Degree (MBA) (M.S)</th>
                    <td>Master's in Business Marketing and Management</td>
                </tr>
                <tr>
                    <th>Classes</th>
                    <td>Business, Accounting/Marketing</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>Ottumwa, IA</td>
                </tr>
                <tr>
                    <th>Career Job</th>
                    <td>Independent Marketer</td>
                </tr>
            </table>
        
        <table>
        <div class="COMPUTER SOFTWARE DEVELOPMENT">
            <h7>CSD Degree</h7>
                <tr>
                    <th>Term 1</th>
                    <td>3 Months 5 classes</td>
                </tr>
                <tr>
                    <th>1st Class</th>
                    <td>Python</td>
                </tr>
                <tr>
                    <th>2nd class</th>
                    <td>WebPage Development</td>
                </tr>
                <tr>
                    <th>3rd Class</th>
                    <td>Programming logic</td>
                </tr>
                <tr>
                    <th>4th Class</th>
                    <td>Employability</td>
                </tr>
                <tr>
                    <th>Online Class</th>
                    <td>Intro to Computers</td>
                </tr>
        
            </table>
            
            <img class="img-25 d-block m-3 img-fluid rounded " style="width: 25%;" alt="quotes" src="https://raw.githubusercontent.com/A-TrainStation/Images/main/Quotes%20on%20computers.jpg"> </div>`;
	
	const page = new Page({ navbar: _navbardef, title: 'home', body: htmlContent });
	return c.html(page.render())
});

app.get('/engagement', async (c) => {
	const htmlContent = `<div class="container">
            <div class="Book"> 
             <h2 id="Rollerbading Dance Off Book"> Rollerblading Dance Off book</h2>
             <h3 id="Aurhor">Written by Alexander Meiners – June 4th, 2017</h3>
                    <p>Rollerblading has been a huge passion of mine and I have seen musicals and dances, but no Rollerblading dance offs.
                        I began thinking about writing a book about rollerblading dance and that All ages can read.
                        One of my favorite parts of writing is the style and creativity behind the book story.</p>
                    <p>The unique part of writing a book is that you get to start from scratch and build.
                        Rollerblading is a great outdoor activity, but does possess risks if your not careful.
                        I taught myself how to rollerblade and ever since then I have fall in love with skating in my free time.
                        Writing a story was never something I even dreamed of, but it has been a hightlight throughout my life.
                    </p></div>

            <div class="Hobbies">
                    <p>HOBBIES</p>
                    <ul>
                        <li> 1. Rollerblading</li>
                        <li> 2. Writing story scripts</li>
                        <li> 3. Alto Saxophone</li>
                        <li> 4. Playing Tennis</li>
                        <li> 5. Building Legos</li>
                        <li> 6. Video Gaming</li>
                        <li> 7. Programming</li>
                    </ul>
                </div>
            <div class="Church">
                <h4>Church</h4>
                <p>I am a member of the Latter Day Saints Church of Jesus Christ. 
                    I have have been an active member and recieved callings. 
                    The callings consist of YSA Representaive, and Youth Activites Coordinator.
                    The nice part about being part of an organization, like a church is you get to meet
                    so many wonderful people. 
                </p>
            </div>
            <div class="Realtor">
                <h5>Real Estate</h5>
                <p>
                    I am a former Real Estate Agent with REMAX PRIDE here in Ottumwa, IA
                    Being a Real Estate Agent has been a huge blessing to provide the best
                    services for my clients when looking at buying or selling Real Estate Property.
                    Check out one of my Property sales, underneath!!.
                </p>
                <p>Fun Fact!
                    Did you know that my very 1st sale was on October 31st!! Happy Halloween!
                </p>
                 <img class="img-25 d-block m-3" alt="Realtor" src="https://raw.githubusercontent.com/A-TrainStation/Images/main/Realtor%20logo.jpg">

                <h6>ALTO SAXOPHONE</h6>
                <table>
                    <tr>
                        <th>Alto Saxophone</th>
                        <td>Woodwind Instrument</td>
                    </tr>
                    <tr>
                        <th>Years in Band</th>
                        <td>8 years</td>
                    </tr>
                    <tr>
                        <th>Marching Band</th>
                        <td>Competed in 4 years</td>
                    </tr>
                    <tr>
                        <th>Saxophone compenents</th>
                        <td>Body, Neck/strap, Ligature, Reed, Mouth Piece.</td>
                    </tr>
                </table>
                <img class="img-25 d-block m-3 img-fluid rounded " alt="Insturment" src="https://hlsmusicindonesia.com/wp-content/uploads/2023/01/YAS280.jpg">
                <p>My first year of High School Marching Band our theme song was Pirates of the Caribbean.</p>
                <div class="Legos">
                    <img id="Legos" alt="Pirate Ship" src="../Images/1547.jpeg">
                    <img id="Legos" alt="Pirates 5" src="../Images/1548.jpeg">
                    <img id="Legos" alt="Silent Mary" src="../Images/1565.jpeg">
                    <img id="Legos" alt="Lego Set" src="../Images/1551.jpeg">
                </div>
                <p> I am a huge fan of Pirates of the caribbean Legos.
                    This has been a hobby of mine, building legos. 
                </p>
            </div>

        <script>
            // Function to handle the quiz
            function handleQuiz() {
                // Array to store user information
                var userInformation = [];
        
                // Ask the user for their favorite hobby
                var hobby = prompt("What is your favorite hobby?");
                userInformation.push(hobby);
        
                // Ask the user about their favorite book
                var favoriteBook = prompt("What is your favorite book?");
                userInformation.push(favoriteBook);
        
                // Ask the user about their favorite movie
                var favoriteMovie = prompt("What is your favorite movie?");
                userInformation.push(favoriteMovie);
        
                // Display a message based on the user's input
                switch(hobby.toLowerCase()) {
                    case 'rollerblading':
                        alert("That's great! Rollerblading is an awesome hobby!");
                        break;
                    case 'writing story scripts':
                        alert("Awesome! Writing is a fantastic way to express creativity!");
                        break;
                    case 'alto saxophone':
                        alert("Nice! Playing a musical instrument is so much fun!");
                        break;
                    case 'playing tennis':
                        alert("Tennis is a great way to stay active!");
                        break;
                    case 'building legos':
                        alert("Building Legos is a fantastic way to express creativity!");
                        break;
                    case 'video gaming':
                        alert("Gaming can be a lot of fun! What's your favorite game?");
                        break;
                    default:
                        alert("That's interesting! " + hobby + " sounds like a fun hobby!");
                }
        
                switch(favoriteBook.toLowerCase()) {
                    case 'harry potter':
                        alert("Harry Potter is a classic! Which book is your favorite?");
                        break;
                    case 'the lord of the rings':
                        alert("The Lord of the Rings is an epic fantasy series!");
                        break;
                    case 'to kill a mockingbird':
                        alert("To Kill a Mockingbird is a timeless classic!");
                        break;
                    case 'the great gatsby':
                        alert("The Great Gatsby is a masterpiece of American literature!");
                        break;
                    case '1984':
                        alert("1984 is a dystopian classic!");
                        break;
                    default:
                        alert("Wow! " + favoriteBook + " sounds like a great book!");
                }
        
                switch(favoriteMovie.toLowerCase()) {
                    case 'transformers':
                        alert("Transformers is an action-packed blockbuster!");
                        break;
                    case 'charlie and the chocolate factory':
                        alert("Charlie and the Chocolate Factory is a whimsical adventure!");
                        break;
                    case 'twister':
                        alert("Twister is a thrilling disaster film!");
                        break;
                    case 'despicable me':
                        alert("Despicable Me is a fun and heartwarming animated movie!");
                        break;
                    case 'nonstop':
                        alert("Nonstop is a suspenseful action thriller!");
                        break;
                    default:
                alert("I haven't seen " + favoriteMovie + ". I'll have to check it out!");
            }
                // Do something fun with the user's information
                console.log("User's favorite hobby is: " + hobby);
                console.log("User's favorite book is: " + favoriteBook);
                console.log("User's favorite movie is: " + favoriteMovie);
                console.log("User information array: " + userInformation);
            }
        
            // Call the function when the page loads
            window.onload = function() {
                handleQuiz();
            };
        </script> </div>`;
	const style = Page.getStyleObject('purplecrayon');
	const page = new Page({ navbar: _navbardef, title: 'home', style: style, body: htmlContent });
	return c.html(page.render())
});

app.get('/gallary', async (c) => {
	const htmlContent = `<div class="container mt-5">
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" alt="Warriors Logo" src="https://picsum.photos/200">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="Vivint Arena" src="../Images/IMG_1215.JPEG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="Jazz Game" src="../Images/IMG_1424.JPEG">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" alt="Hello Abraham Lincoln" src="../Images/IMG_1207.JPEG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="Sunrise UTAH" src="../Images/IMG_1301.JPEG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="Museum" src="../Images/IMG_1292.JPEG">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" alt="BYU Museum" src="../Images/IMG_1282.JPEG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="Anmials" src="../Images/IMG_1285.JPEG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="My Friends" src="../Images/IMG_1280.JPEG">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" alt="PPG Paints Arena" src="../Images/IMG_2586.JPG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="5X Champions" src="../Images/IMG_2585.JPG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="Sid The Kid" src="../Images/IMG_2584.JPG">
                </div>
            </div>
            <p>In the past few years, I got to explore the great State of Salt Lake City,UT.
                During my 2 week trip, I had the pleasure to stay with my friends Josh, and Kaley
                and his family. I got to take pictures of Salt Lake City and you can explore Utah
                with me. Take a look and see!!!. 
            </p2>
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" alt="SLC, UT" src="../Images/IMG_1351.JPEG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="SLC, UT" src="../Images/IMG_1363.JPEG">
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" alt="SLC, UT" src="../Images/IMG_1372.JPEG">
                </div>
            </div>
        </div> `;
	const page = new Page({ navbar: _navbardef, title: 'home', body: htmlContent });
	return c.html(page.render())
});

app.get('/ai', (c) => {
    const aiPage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Interaction</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          #container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          #chat {
            height: 400px;
            overflow-y: auto;
            border: 1px solid #ddd;
            padding: 10px;
            background-color: #fafafa;
            border-radius: 4px;
          }
          #inputForm {
            display: flex;
            margin-top: 10px;
          }
          #inputText {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          #sendButton {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 4px;
            margin-left: 10px;
          }
        </style>
      </head>
      <body>
        <div id="container">
          <header class="text-center my-4">
            <h1>AI Interaction</h1>
            <p>Interact with our AI chatbot below!</p>
          </header>
          <div id="chat"></div>
          <form id="inputForm">
            <input type="text" id="inputText" placeholder="Type your message here...">
            <button type="button" id="sendButton">Send</button>
          </form>
        </div>
        <script>
          document.getElementById('sendButton').addEventListener('click', async function() {
            var inputText = document.getElementById('inputText').value;
            var chat = document.getElementById('chat');
            
            // Append user message
            chat.innerHTML += '<p><strong>You:</strong> ' + inputText + '</p>';
            
            // Call AI API
            try {
              let response = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: inputText })
              });
              
              let data = await response.json();
              var aiResponse = data.answer;
            } catch (error) {
              var aiResponse = 'Sorry, there was an error communicating with the AI service.';
            }
            
            // Append AI response
            chat.innerHTML += '<p><strong>AI:</strong> ' + aiResponse + '</p>';
            
            // Scroll to bottom
            chat.scrollTop = chat.scrollHeight;
            
            // Clear input field
            document.getElementById('inputText').value = '';
          });
        </script>
      </body>
      </html>
    `;
    return c.html(aiPage);
  });
  
  
  

  app.get('/poems', async (c) => {
    const poem = `
      DREAMING PAST THE DAYS I LOVE, playing baseball with my glove.
      Bouncing Ideas off a wall, 2 day's later I helped the mall.
      Have any concerns please call, I will see you Next Years Fall.
      Moving on to something good, reading books like Red Riding Hood.
      Looking back at who I am, thanking my town as my fans.
      Feeling stronger like a man. Having such a great Career, couldn't done it without my fears.
      At least everyone's gone through tears. Taking Words of advice from me, don't you worry your safe with me.
      Come to me and 1 / 1 1 show you, see. Picking out one Memory, being with my family.
      Hope you all decide to agree. Staying with my easy flow, one wrong turn and your down below.
      Why is every answer No?. Please C'mon my heart is low.
      Taking someone out tonight, love the kindness and polite. Has someone told you're bright.
      Sending wish cards overseas, having my family come see. The entire family tree.
      Stopping at a perfect time, really shares joy in my Rhymes, hate when people do bad Crimes.
      Selling out my works of art, turning scratch in a new fresh start.
      Taking these words from my heart, hopes this song never falls apart.
      THIS IS MY MOMENT WITH YOU, ONE LAST THING LETS ALL STAY TRUE.
    `;
  
    const poemsPage = new Page({
      title: 'Dreaming Past the Days',
      body: `
        <head>
          <style>
            body {
    //           font-family: 'Arial', sans-serif;
    //           background-color: #f4f4f9;
    //           margin: 0;
    //           padding: 0;
    //           display: flex;
               justify-content: center;
               align-items: center;
              height: 100vh;
              background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
                }
  
            #poem-container {
              background: #fff;
              border: 2px solid #ff7f50;
              padding: 30px;
              border-radius: 15px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
              max-width: 700px;
              text-align: center;
              transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
              margin: 0 auto; /* Center horizontally */
              position: relative; /* Ensure the pseudo-element works */
            }
  
            #poem-container:hover {
              transform: scale(1.05);
              box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
            }
  
            #poem-container::before {
              content: '';
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 110%;
              height: 110%;
              background: radial-gradient(circle at top left, rgba(255,127,80,0.3), transparent 70%);
              border-radius: 20px;
              z-index: -1;
            }
  
    //         h1 {
    //           margin-bottom: 25px;
    //           font-size: 2em;
                 color: #ff7f50;
    //           font-family: 'Georgia', serif;
    //         }
  
    //         #poem {
    //           white-space: pre-line;
    //           line-height: 1.8;
    //           font-size: 1.1em;
              color: #333;
    //         }
  
    //         @media (max-width: 600px) {
    //           #poem-container {
    //             padding: 20px;
    //             max-width: 90%;
    //           }
  
    //           h1 {
    //             font-size: 1.5em;
    //           }
  
    //           #poem {
    //             font-size: 1em;
    //           }
    //         }
    //       </style>
        </head>
        <body>
          <header class="text-center my-4">
            <h1>Dreaming Past the Days</h1>
            <div id="poem-container">
              <p id="poem"></p>
            </div>
          </header>
          <main class="container text-center">
            <p>This page contains the poem "Dreaming Past the Days" written by Alexander Meiners.</p>
            <p>Date: September 21st, 2012</p>
          </main>
          <script>
            document.addEventListener("DOMContentLoaded", function() {
              document.getElementById("poem").textContent = \`${poem.trim()}\`;
            });
          </script>
        </body>
      `,
      navbar: _navbardef,
    });
  
    return c.html(poemsPage.render());
  });


//   app.get('/movies', (c) => {
//     const omdbHtmlContent = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>OMDB Movie Search</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//             }
//             #container {
//               max-width: 600px;
//               margin: 50px auto;
//             }
//             #searchInput {
//               width: 100%;
//               padding: 10px;
//               font-size: 16px;
//               margin-bottom: 10px;
//             }
//             #searchButton {
//               padding: 10px 20px;
//               font-size: 16px;
//               cursor: pointer;
//             }
//             #movieDetails {
//               margin-top: 20px;
//             }
//             #movieDetails img {
//               max-width: 100%;
//               height: auto;
//             }
//           </style>
//         </head>
//         <body>
//           <div id="container">
//             <h1>OMDB Movie Search</h1>
//             <input type="text" id="searchInput" placeholder="Enter movie title">
//             <button id="searchButton">Search</button>
//             <div id="movieDetails"></div>
//           </div>
        
//           <script>
//             document.getElementById('searchButton').addEventListener('click', function() {
//               var searchInput = document.getElementById('searchInput').value;
//               fetch('https://www.omdbapi.com/?apikey=86170dad&t=' + searchInput)
//                 .then(response => response.json())
//                 .then(data => {
//                   var movieDetails = document.getElementById('movieDetails');
//                   if (data.Response === "True") {
//                     movieDetails.innerHTML = \`
//                       <h2>\${data.Title}</h2>
//                       <img src="\${data.Poster}" alt="\${data.Title} poster">
//                       <p><strong>Year:</strong> \${data.Year}</p>
//                       <p><strong>Rated:</strong> \${data.Rated}</p>
//                       <p><strong>Genre:</strong> \${data.Genre}</p>
//                       <p><strong>Director:</strong> \${data.Director}</p>
//                       <p><strong>Actors:</strong> \${data.Actors}</p>
//                       <p><strong>Plot:</strong> \${data.Plot}</p>
//                     \`;
//                   } else {
//                     movieDetails.innerHTML = \`<p>\${data.Error}</p>\`;
//                   }
//                 })
//                 .catch(error => {
//                   console.error('Error:', error);
//                 });
//             });
//           </script>
//         </body>
//         </html>
//     `;
//     return c.html(omdbHtmlContent);
// });

// // Serve static files (e.g., images, CSS) if necessary
// app.use('/static/*', serveStatic({ root: './' }));

// app.get('/', async (c) => {
//     const htmlContent = new Page`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>OMDB Movie Search</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//         }
//         #container {
//           max-width: 600px;
//           margin: 50px auto;
//         }
//         #searchInput {
//           width: 100%;
//           padding: 10px;
//           font-size: 16px;
//           margin-bottom: 10px;
//         }
//         #searchButton {
//           padding: 10px 20px;
//           font-size: 16px;
//           cursor: pointer;
//         }
//         #movieDetails {
//           margin-top: 20px;
//         }
//         #movieDetails img {
//           max-width: 100%;
//           height: auto;
//         }
//       </style>
//     </head>
//     <body>
//       <div id="container">
//         <h1>OMDB Movie Search</h1>
//         <input type="text" id="searchInput" placeholder="Enter movie title">
//         <button id="searchButton">Search</button>
//         <div id="movieDetails"></div>
//       </div>
  
//       <script>
//         document.getElementById('searchButton').addEventListener('click', function() {
//           var searchInput = document.getElementById('searchInput').value;
  
//           fetch('https://www.omdbapi.com/?apikey=86170dad&t=' + searchInput)
//             .then(response => response.json())
//             .then(data => {
//               var movieDetails = document.getElementById('movieDetails');
//               if (data.Response === "True") {
//                 movieDetails.innerHTML = \`
//                   <h2>\${data.Title}</h2>
//                   <img src="\${data.Poster}" alt="\${data.Title} poster" class="img-fluid rounded">
//                   <p><strong>Year:</strong> \${data.Year}</p>
//                   <p><strong>Rated:</strong> \${data.Rated}</p>
//                   <p><strong>Genre:</strong> \${data.Genre}</p>
//                   <p><strong>Director:</strong> \${data.Director}</p>
//                   <p><strong>Actors:</strong> \${data.Actors}</p>
//                   <p><strong>Plot:</strong> \${data.Plot}</p>
//                 \`;
//               } else {
//                 movieDetails.innerHTML = \`<p>\${data.Error}</p>\`;
//               }
//             })
//             .catch(error => {
//               console.error('Error:', error);
//             });
//         });
//       </script>
//     </body>
//     </html>
//     `;
//     return c.html(htmlContent);
//   });
  

app.get('/', async (c) => {
	const htmlContent = ` `;
	const page = new Page({ navbar: _navbardef, title: 'home', body: htmlContent });
	return c.html(page.render())
});

//  const htmlContent = ` `
//  const page = new Page({navbar: _navbardef, title: "home", body: htmlContent})
//   return rawHtmlResponse (page.render())

app.notFound((c) => {
	const page = new Page({
		pageTitle: '404 | Not Found!',
		body: `
                <span class='fs-3'>404 Not Found!</span> <hr> PAGE NOT FOUND! Head <a href='/'>home</a> to try and find what you're looking for.`,
	});
	return c.html(page.render())
});

export default app;
