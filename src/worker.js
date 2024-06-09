// New comment
const _navbardef = [
    { title: "index", href: "/", type: "Home" },
    { title: "biography", href: "/bio", type: "about" },
    { title: "Career-goals", href: "/goals", type: "career-goals" },
    { title: "Activities-organization", href: "/engagement", type: "activities-organization" },
    { title: "Images", href: "/gallary", type: "images" },
];

const currentAge = (birthdate) => {
    const current = new Date();
    const birth = new Date(birthdate);
    const age = (current - birth) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(age);
};

console.log(currentAge("1997-11-19"));

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
            'home': {
                header: { background_color: "000" },
                body: { background_color: "e0ebeb", text_color: "ccf5ff" },
            },
            'greenlantern': {
                header: { background_color: "ccffdd" },
                body: { background_color: "e0ebeb", text_color: "ccf5ff" },
            },
            'purplecrayon': {
                header: { background_color: "ccffdd" },
                body: { background_color: "f7e6ff", text_color: "ccf5ff" },
            },
            'blueberry': {
                header: { background_color: "ccffdd" },
                body: { background_color: "b3f0ff", text_color: "ccf5ff" },
            },
            'yellowflower': {
                header: { background_color: "ccffdd" },
                body: { background_color: "e0ebeb", text_color: "ccf5ff" },
            },
            'default': {
                header: { background_color: "000", text_align: "center" },
                body: { background_color: "e0ebeb", text_color: "fff" },
            },
        };
        return styleTypes[style] || styleTypes['default'];
    }

    constructor(args) {
        this.navbar = args.navbar;
        this.style = args.style;
        this.title = args.title;
        this.body = args.body;
        this.footer = args.footer || `<footer class="footer mt-auto py-3 bg-light">
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
        </footer>`;
        this.backgroundColor = args.backgroundColor || "#Fddfed";
    }

    get navbar() {
        let output = "";
        for (const each of this._navbar) {
            output += `<a class="nav-link" href="${each.href}">${each.title}</a>`;
        }

        return `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                ${output}
                            </ul>
                        </div>
                    </div>
                </nav>`;
    }

    set navbar(navbarObject) {
        this._navbar = navbarObject;
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
        }`;
    }

    set style(args) {
        const styledef = Page.getStyleObject('default');
        const merge = mergeDeep(styledef, args);
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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                ${this.style}
            </style>
            <script src="https://kit.fontawesome.com/2101804b79.js" crossorigin="anonymous"></script>
        </head>
        <body>
            <header class="bg-dark text-white text-center py-3">
                <h1 id="banner-text">Life of Alexander Meiners</h1>
            </header>`;
    }

    set header(title) {
        this.title = title;
    }

    get body() {
        return this._body;
    }

    set body(content) {
        this._body = content;
    }

    get footer() {
        return this._footer;
    }

    set footer(content) {
        this._footer = content;
    }

    render() {
        return this.header + this.navbar + this.body + this.footer;
    }
}

var src_default = {
    async fetch(request, env, ctx) {
        const url = request.url;

        function getParameterByName(name) {
            name = name.replace(/[\[\]]/g, "\\$&");
            name = name.replace(/\//g, "/");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            else if (!results[2]) return "";
            else if (results[2]) {
                results[2] = results[2].replace(/\//g, "/");
            }
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        function rawHtmlResponse(html) {
            return new Response(html, {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
            });
        }

        function BadRequestException(reason) {
            this.status = 400;
            this.statusText = "Bad Request";
            this.reason = reason;
        }

        const { host, protocol, pathname } = new URL(request.url);
        if ("https:" !== protocol || "https" !== request.headers.get("x-forwarded-proto")) {
            throw new BadRequestException("Please use a HTTPS connection.");
        }

        switch (pathname) {
            case "/": {
                const htmlContent = `<div class="container">
                <h2 class="text-center my-4">There is a Book inside everyone's life!</h2>
                <p>Hi Everyone!, Welcome to my Website, My Name is Alexander Meiners, I am a former and current Student at Indian Hills Community College, and when I went to school here before, it was Business and Marketing. My Life is like a book because oddly enough I write books for a living. My future wasn't always certain. I had a hard time figuring out my path in life. This is my second time attending Indian Hills and when I went to school before it was for Business and Marketing. I also like to write, as a matter of fact, I write books and run a podcast. As I already said, I am very unsure about what I want to do, but I hope to have a bright future!</p>
                </div>`;
                const page = new Page({
                    navbar: _navbardef,
                    title: "Home",
                    body: htmlContent,
                });
                return rawHtmlResponse(page.render());
            }
            case "/bio": {
                const htmlContent = `<div class="container">
                <h2 class="text-center my-4">Biography of Alexander Meiners</h2>
                <p>Hi, my name is Alexander Meiners. I was born on November 19th, 1997, which makes me ${currentAge("1997-11-19")} years old. I live in the small town of Wapello, Iowa, where I've been for the majority of my life. I enjoy playing video games, and I enjoy going on small adventures with my friends. I love spending time with my girlfriend and love doing fun activities with my friends.</p>
                <p>I have two younger siblings, one brother, and one sister. I went to school in Wapello, where I graduated in 2016. When I first started going to Indian Hills, it was for Business and Marketing. I am currently enrolled in Software Engineering, and I hope to have a bright future. I love my family, and I am very close to them. I have had some ups and downs in my life but have come out stronger because of them.</p>
                </div>`;
                const page = new Page({
                    navbar: _navbardef,
                    title: "Biography",
                    body: htmlContent,
                });
                return rawHtmlResponse(page.render());
            }
            case "/goals": {
                const htmlContent = `<div class="container">
                <h2 class="text-center my-4">Career Goals</h2>
                <p>My main career goal is to work in a field that I am passionate about. I hope to one day become a successful software engineer and possibly own my own business. I want to be able to provide for my family and give back to the community that has supported me throughout my life. My ultimate goal is to be happy and fulfilled in whatever career path I choose.</p>
                </div>`;
                const page = new Page({
                    navbar: _navbardef,
                    title: "Career Goals",
                    body: htmlContent,
                });
                return rawHtmlResponse(page.render());
            }
            case "/engagement": {
                const htmlContent = `<div class="container">
                <h2 class="text-center my-4">Activities and Organization Engagement</h2>
                <p>I have been involved in various activities and organizations throughout my life. In high school, I was part of the student council and played on the football team. In college, I have been involved in several clubs and organizations, including the Software Engineering Club and the Business Club. I enjoy being active in my community and giving back whenever I can.</p>
                </div>`;
                const page = new Page({
                    navbar: _navbardef,
                    title: "Activities and Organization Engagement",
                    body: htmlContent,
                });
                return rawHtmlResponse(page.render());
            }
            case "/gallary": {
                const htmlContent = `<div class="container">
                <h2 class="text-center my-4">Images</h2>
                <p>Welcome to the gallery page! Here you can find various images that showcase my life, my adventures, and my interests.</p>
                </div>`;
                const page = new Page({
                    navbar: _navbardef,
                    title: "Gallery",
                    body: htmlContent,
                });
                return rawHtmlResponse(page.render());
            }
            default: {
                const htmlContent = `<div class="container">
                <h2 class="text-center my-4">Page Not Found</h2>
                <p>We're sorry, but the page you are looking for does not exist. Please check the URL and try again.</p>
                </div>`;
                const page = new Page({
                    navbar: _navbardef,
                    title: "404 - Page Not Found",
                    body: htmlContent,
                });
                return rawHtmlResponse(page.render());
            }
        }
    },
};
export {
    src_default as default
};
