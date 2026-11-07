(function () {
  var pages = ["home", "about", "products", "contact", "terms", "privacy"];
  var links = document.getElementById("links"),
    bg = document.querySelector(".burger");
  var io = null;
  try {
    io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
  } catch (e) {}
  function route() {
    var h = (location.hash || "#home").slice(1);
    if (pages.indexOf(h) < 0) h = "home";
    pages.forEach(function (p) {
      document.getElementById(p).classList.toggle("show", p === h);
    });
    document.querySelectorAll(".links a.l").forEach(function (a) {
      a.classList.toggle("on", a.dataset.p === h);
    });
    links.classList.remove("open");
    bg.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    document.title = {
      home: "AETOVA — Technology built for Africa",
      about: "About — AETOVA",
      products: "Products — AETOVA",
      contact: "Contact — AETOVA",
      terms: "Terms of Service — AETOVA",
      privacy: "Privacy Policy — AETOVA",
    }[h];
    document.querySelectorAll("#" + h + " .rv").forEach(function (el) {
      if (io) {
        io.observe(el);
      } else {
        el.classList.add("in");
      }
    });
  }
  window.addEventListener("hashchange", route);
  route();
  bg.addEventListener("click", function () {
    var o = links.classList.toggle("open");
    bg.setAttribute("aria-expanded", o);
  });
  function net(el) {
    var NS = "http://www.w3.org/2000/svg",
      s = document.createElementNS(NS, "svg");
    s.setAttribute("class", "net");
    s.setAttribute("viewBox", "0 0 1440 700");
    s.setAttribute("preserveAspectRatio", "xMidYMid slice");
    s.setAttribute("aria-hidden", "true");
    var seed = el.classList.contains("hero") ? 7 : 21,
      r = function () {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      },
      P = [],
      i,
      j;
    for (i = 0; i < 52; i++) P.push([r() * 1440, r() * 700]);
    for (i = 0; i < P.length; i++)
      for (j = i + 1; j < P.length; j++) {
        var d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]);
        if (d < 210) {
          var l = document.createElementNS(NS, "line");
          l.setAttribute("x1", P[i][0]);
          l.setAttribute("y1", P[i][1]);
          l.setAttribute("x2", P[j][0]);
          l.setAttribute("y2", P[j][1]);
          s.appendChild(l);
        }
      }
    P.forEach(function (p, k) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", p[0]);
      c.setAttribute("cy", p[1]);
      c.setAttribute("r", 2 + r() * 2.5);
      if (k % 4 === 0) {
        c.setAttribute("class", "p");
        c.style.animationDelay = (r() * 5).toFixed(1) + "s";
      }
      s.appendChild(c);
    });
    el.insertBefore(s, el.firstChild);
  }
  document
    .querySelectorAll(
      ".hero,.dark,#home>section:last-child,#contact>section:last-child",
    )
    .forEach(net);
  var fs = document.getElementById("fold");
  if (fs) {
    var NS = "http://www.w3.org/2000/svg",
      A = [
        [200, 30],
        [345, 115],
        [360, 270],
        [200, 375],
        [45, 290],
        [60, 120],
        [150, 170],
        [260, 185],
        [195, 290],
      ],
      B = [
        [230, 25],
        [370, 160],
        [310, 330],
        [170, 370],
        [50, 250],
        [90, 90],
        [190, 150],
        [280, 230],
        [170, 265],
      ],
      F = [
        [5, 0, 6],
        [0, 1, 6],
        [1, 7, 6],
        [1, 2, 7],
        [2, 3, 7],
        [3, 8, 7],
        [3, 4, 8],
        [4, 5, 8],
        [5, 6, 8],
        [6, 7, 8],
      ],
      g = fs.querySelector("#fg"),
      ps = [],
      ds = [];
    net(fs.querySelector(".fold-stage"));
    F.forEach(function (f, k) {
      var p = document.createElementNS(NS, "polygon");
      p.setAttribute("fill", "url(#fgr)");
      p.setAttribute(
        "fill-opacity",
        [0.9, 0.55, 0.75, 0.4, 0.85, 0.5, 0.7, 0.35, 0.6, 1][k],
      );
      p.setAttribute("stroke", "#fff");
      p.setAttribute("stroke-opacity", ".55");
      p.setAttribute("stroke-linejoin", "round");
      g.appendChild(p);
      ps.push(p);
    });
    A.forEach(function (a, k) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("r", k === 7 ? 7 : 4);
      c.setAttribute("fill", k === 7 ? "#FFB547" : "#fff");
      g.appendChild(c);
      ds.push(c);
    });
    var t1 = fs.querySelector(".ft1"),
      t2 = fs.querySelector(".ft2"),
      steps = fs.querySelectorAll(".fold-steps button"),
      still = matchMedia("(prefers-reduced-motion:reduce)").matches,
      tk = false;
    var cl = function (x) {
      return Math.max(0, Math.min(1, x));
    };
    var draw = function (p) {
      var e = p * p * (3 - 2 * p),
        P = A.map(function (a, k) {
          return [a[0] + (B[k][0] - a[0]) * e, a[1] + (B[k][1] - a[1]) * e];
        });
      F.forEach(function (f, k) {
        ps[k].setAttribute(
          "points",
          f
            .map(function (j) {
              return P[j].join(",");
            })
            .join(" "),
        );
      });
      P.forEach(function (q, k) {
        ds[k].setAttribute("cx", q[0]);
        ds[k].setAttribute("cy", q[1]);
      });
      g.setAttribute(
        "transform",
        "translate(20 20) scale(.9) rotate(" + (e * 14 - 7) + " 200 200)",
      );
      if (!still) {
        var a = 1 - cl(p / 0.5),
          b = cl((p - 0.5) / 0.5);
        t1.style.opacity = a;
        t1.style.transform = "translateY(" + -24 * (1 - a) + "px)";
        t2.style.opacity = b;
        t2.style.transform = "translateY(" + 24 * (1 - b) + "px)";
        steps[0].classList.toggle("on", p < 0.5);
        steps[1].classList.toggle("on", p >= 0.5);
      }
    };
    var cur = 0,
      tgt = 0,
      last = 0,
      run = false;
    var step = function (ts) {
      var dt = Math.min(ts - (last || ts), 50);
      last = ts;
      var d = tgt - cur,
        m = dt / 900;
      if (Math.abs(d) <= m) {
        cur = tgt;
        draw(cur);
        run = false;
        last = 0;
        return;
      }
      cur += d > 0 ? m : -m;
      draw(cur);
      requestAnimationFrame(step);
    };
    var go = function () {
      if (!run) {
        run = true;
        last = 0;
        requestAnimationFrame(step);
      }
    };
    var upd = function () {
      if (still) return;
      var r = fs.getBoundingClientRect(),
        t = fs.offsetHeight - window.innerHeight,
        raw = t > 0 ? cl(-r.top / t) : 0,
        n = tgt ? (raw < 0.3 ? 0 : 1) : raw > 0.45 ? 1 : 0;
      if (n !== tgt) {
        tgt = n;
        go();
      }
    };
    var req = function () {
      if (!tk) {
        tk = true;
        requestAnimationFrame(function () {
          tk = false;
          upd();
        });
      }
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    window.addEventListener("hashchange", req);
    draw(0);
    upd();
    steps.forEach(function (b, i) {
      b.addEventListener("click", function () {
        var t = fs.offsetHeight - window.innerHeight,
          top = fs.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: top + (i ? t * 0.7 : 0),
          behavior: still ? "auto" : "smooth",
        });
      });
    });
  }
  var w = document.querySelector(".wave");
  if (w) {
    for (var i = 0; i < 56; i++) {
      var b = document.createElement("i");
      b.style.height =
        12 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 88 + "%";
      w.appendChild(b);
    }
  }
  document.getElementById("yr").textContent = new Date().getFullYear();
  document.getElementById("cf").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var f = ev.target;
    var body =
      "Name: " + f.n.value + "\nEmail: " + f.e.value + "\n\n" + f.m.value;
    document.getElementById("fm").textContent =
      "Opening your email app. Replace the recipient address in the page code with your business email.";
    location.href =
      "mailto:hello@yourdomain.com?subject=" +
      encodeURIComponent("Website enquiry from " + f.n.value) +
      "&body=" +
      encodeURIComponent(body);
  });
})();
