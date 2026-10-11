(() => {
  const profile = {
    name: "Jarred Encabo",
    bio: "Aspiring Full Stack Developer | IT Graduate | Building responsive websites and web applications | Always learning and improving.",
    email: "encabojarred@gmail.com",
    phone: "+639761376201",
    whatsapp: "https://wa.me/639761376201",
    linkedin: "https://www.linkedin.com/in/jarred-encabo-9a68a0126/",
    instagram: "https://www.instagram.com/buuyoooo/",
    facebook: "https://www.facebook.com/jarred.encabo",
    github: "https://github.com/jard36",
    discord: "buyo4618"
  };
  const profileImage = "images/jarred-profile.png";
  const gmailComposeUrl = () => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;
  const projects = [
    { title: "Warehouse Inventory System", image: "images/projects/warehouse-inventory-system.png" },
    { title: "Living Hope System", image: "images/projects/living-hope-system.png" },
    { title: "Payable Webapp", image: "images/projects/payable-webapp.png" },
    { title: "Sagana Milking System", image: "images/projects/sagana-milking-system.png" }
  ];
  const stacks = ["JavaScript", "CSS", "Vercel", "Supabase", "MongoDB", "Notion"];
  const hidden = (node) => {
    if (!node) return;
    node.dataset.jarredHidden = "true";
    node.setAttribute("aria-hidden", "true");
  };
  const sectionForHeading = (text) => {
    const heading = [...document.querySelectorAll("h2")].find((node) => node.textContent.trim() === text);
    if (!heading) return null;
    let node = heading;
    while (node.parentElement && node.parentElement.getAttribute("data-framer-name") !== "Sections") node = node.parentElement;
    return node;
  };
  const contentFor = (section) => section && [...section.querySelectorAll('[data-framer-name="Section Content"]')];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const updateSocialLinks = () => {
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (/instagram\.com/i.test(href)) {
        a.href = profile.instagram;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      if (/(?:twitter\.com|x\.com|dribbble\.com)/i.test(href)) hidden(a.closest('[class*="-container"]') || a);
    });
  };
  const updateEmailLinks = () => {
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (!/^mailto:/i.test(href) && !/email\s*me/i.test(a.textContent)) return;
      a.href = gmailComposeUrl();
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  };
  const currentPage = () => {
    const path = location.pathname.replace(/\/+$/, "");
    const last = path.split("/").pop() || "";
    const page = last.replace(/\.html$/i, "").toLowerCase();
    return ["index", "contact", "services", "404"].includes(page) ? page : "index";
  };
  const pageIsCustomized = (page) => {
    if (page === "index") return Boolean(document.querySelector(".jarred-name"));
    if (page === "contact") return Boolean(document.querySelector(".jarred-contact-grid"));
    if (page === "services") return Boolean(document.querySelector(".jarred-showcase-card"));
    return true;
  };
  const updateIntro = (headingText, description) => {
    const section = sectionForHeading(headingText);
    if (!section) return;
    section.querySelectorAll("p").forEach((p) => {
      if (p.textContent.trim()) p.textContent = description;
    });
  };
  const showLoadingScreen = () => {
    if (currentPage() !== "index" || document.getElementById("jarred-loading-screen")) return;
    const overlay = element("div", "jarred-loading-screen");
    overlay.id = "jarred-loading-screen";
    const card = element("div", "jarred-loading-card");
    const image = document.createElement("img");
    image.src = profileImage;
    image.alt = `${profile.name} profile photo`;
    card.append(image, element("p", "jarred-loading-eyebrow", "Available For Work"), element("h1", "jarred-loading-name", profile.name), element("p", "jarred-loading-bio", profile.bio));
    const stats = element("div", "jarred-loading-stats");
    [["10+", "Happy Clients"], ["2+", "Years of Experience"], ["6+", "Completed Tasks"], ["5", "Awards Received"]].forEach(([value, label]) => {
      const item = element("div", "jarred-loading-stat");
      item.append(element("strong", "jarred-loading-value", value), element("span", "jarred-loading-label", label));
      stats.append(item);
    });
    card.append(stats);
    overlay.append(card);
    document.body.append(overlay);
  };
  const hideLoadingScreen = () => document.getElementById("jarred-loading-screen")?.remove();
  const applySharedContent = () => {
    document.querySelectorAll('[data-framer-name="Services"]').forEach(hidden);
    document.querySelectorAll('a[href*="services"]').forEach((a) => hidden(a.closest('[class*="-container"]') || a));
    ["Words From Happy Clients", "Common Queries"].forEach((title) => hidden(sectionForHeading(title)));
    document.querySelectorAll("section").forEach((section) => {
      if (section.querySelector('[data-framer-name="Logo"]')) hidden(section.closest('[data-framer-name="Container"]') || section);
    });
    updateEmailLinks();
    document.querySelectorAll("a[href]").forEach((a) => {
      const label = a.textContent.trim().replace(/\s+/g, " ");
      const href = a.getAttribute("href") || "";
      if (/^home$/i.test(label) || /(?:^|\/)index(?:\.html)?(?:[/?#]|$)/i.test(href)) a.setAttribute("href", "index.html");
      if (/^contact$/i.test(label) || /(?:^|\/)contact(?:\.html)?(?:[/?#]|$)/i.test(href)) a.setAttribute("href", "contact.html");
      if (/instagram\.com/i.test(href)) {
        a.href = profile.instagram;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      if (/(?:twitter\.com|x\.com|dribbble\.com)/i.test(href)) hidden(a.closest('[class*="-container"]') || a);
      if (/template by praha/i.test(label)) hidden(a.parentElement?.className?.includes("-container") ? a.parentElement : a);
      if (/schedule call/i.test(label) || /cal\.com/i.test(href)) hidden(a.parentElement?.className?.includes("-container") ? a.parentElement : a);
      if (/^services$/i.test(label) || /(?:^|\/)services(?:\.html)?(?:[/?#]|$)/i.test(href)) hidden(a.parentElement?.className?.includes("-container") ? a.parentElement : a);
    });
    document.querySelectorAll('img[alt="Profile Image"], img[src*="vxdZgl3lCbnIdZ3X9U3BTYjfis"]').forEach((img) => {
      img.src = profileImage;
      img.alt = "Jarred Encabo profile photo";
    });
    document.querySelectorAll("[data-framer-name='Footer']").forEach((footer) => {
      footer.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href") || "";
        const label = a.textContent.trim();
        if (/instagram\.com/i.test(href)) {
          a.href = profile.instagram;
          a.querySelectorAll("img").forEach((img) => img.alt = "Instagram");
        } else if (/^https?:|template by praha/i.test(href + " " + label)) {
          hidden(a.parentElement?.className?.includes("-container") ? a.parentElement : a);
        }
      });
      footer.querySelectorAll("p").forEach((p) => {
        if (/@2024|all rights reserved/i.test(p.textContent)) p.textContent = "© 2026 Jarred Encabo. All rights reserved.";
      });
    });
  };
  const updateStats = () => {
    const values = new Map([["Happy Clients", "10"], ["Years of Experience", "2"], ["Complated Tasks", "6"], ["Completed Tasks", "6"], ["Awards Received", "5"]]);
    document.querySelectorAll("p").forEach((label) => {
      const value = values.get(label.textContent.trim());
      if (!value) return;
      if (label.textContent.trim() === "Complated Tasks") label.textContent = "Completed Tasks";
      const box = label.closest('[data-framer-name="Text Container"]');
      const counter = box?.querySelector('[data-framer-name="Counter"]');
      const valueNode = counter && (counter.children[0]?.querySelector("div[style*='font-size']") || counter.children[0]?.querySelector("div"));
      if (valueNode) valueNode.textContent = value;
      if (label.textContent.trim() === "Awards Received") hidden(box?.querySelector('[data-framer-name="Plus"]'));
    });
  };
  const customizePortfolio = () => {
    const page = location.pathname.replace(/\/+$/, "").replace(/\.html$/, "").split("/").pop() || "index";
    const home = page === "index";
    const projectPage = page === "services";
    if (home) {
      const hero = document.querySelector('[data-framer-name="Hero"]');
      hero?.querySelectorAll("h1").forEach((h) => {
        if (h.textContent.trim() === "Jarred") { h.textContent = profile.name; h.classList.add("jarred-name"); }
      });
      hero?.querySelectorAll("p").forEach((p) => {
        if (/Aspiring Full Stack Developer/i.test(p.textContent)) p.textContent = profile.bio;
      });
      hero?.querySelectorAll("img").forEach((img) => {
        if (/Nandi/i.test(img.alt) || /Untitled design|payable-webapp/i.test(img.getAttribute("src") || "")) {
          img.src = profileImage;
          img.alt = "Jarred Encabo profile photo";
        }
      });
      updateStats();
    }
    if (home || projectPage) {
      const experience = sectionForHeading("My Experience");
      if (experience) {
        updateIntro("My Experience", "Selected systems and applications I have worked on.");
        contentFor(experience).forEach((content) => {
          content.classList.add("jarred-grid");
          content.replaceChildren(...projects.map((project, index) => {
            const card = element("article", "jarred-card jarred-experience-card");
            card.append(element("span", "jarred-project-index", `PROJECT 0${index + 1}`), element("h3", "jarred-project-title", project.title));
            return card;
          }));
        });
      }
      const stackSection = sectionForHeading("My Stacks");
      if (stackSection) {
        updateIntro("My Stacks", "Tools and technologies I use.");
        contentFor(stackSection).forEach((content) => {
          content.classList.add("jarred-grid");
          content.replaceChildren(...stacks.map((stack) => element("div", "jarred-card jarred-stack-card", stack)));
        });
      }
      const showcase = sectionForHeading("Creative Design Showcase");
      if (showcase) {
        updateIntro("Creative Design Showcase", "Selected screenshots from my project work.");
        contentFor(showcase).forEach((content) => {
          content.id = "projects";
          content.classList.add("jarred-grid");
          content.replaceChildren(...projects.map((project) => {
            const card = element("article", "jarred-card jarred-showcase-card");
            const img = document.createElement("img");
            img.src = project.image;
            img.alt = `${project.title} screenshot`;
            img.loading = "lazy";
            const copy = element("div", "jarred-showcase-copy");
            copy.append(element("span", "jarred-project-type", "PROJECT"), element("h3", "jarred-project-title", project.title));
            card.append(img, copy);
            return card;
          }));
        });
      }
    }
    if (page === "contact") {
      const contact = document.querySelector('[data-framer-name="Contact"]');
      const heading = contact?.querySelector('[data-framer-name="Section Heading"]');
      const title = heading?.querySelector("h2");
      if (title) title.textContent = "Let's Connect";
      const intro = [...(heading?.querySelectorAll("p") || [])].find((p) => !p.closest("a"));
      if (intro) intro.textContent = "Reach me through email, phone, or social media.";
      const grid = contact?.querySelector('[data-framer-name="Sub Container"]');
      if (grid) {
        grid.classList.add("jarred-grid", "jarred-contact-grid");
        const entries = [
          ["Email", profile.email, gmailComposeUrl()],
          ["Phone", profile.phone, `tel:${profile.phone}`],
          ["WhatsApp", profile.phone, profile.whatsapp],
          ["LinkedIn", "Jarred Encabo", profile.linkedin],
          ["Instagram", "@buuyoooo", profile.instagram],
          ["Facebook", "Jarred Encabo", profile.facebook],
          ["GitHub", "jard36", profile.github]
        ];
        const cards = entries.map(([label, value, href]) => {
          const card = element("a", "jarred-card jarred-contact-card");
          card.href = href;
          if (/^https?:/.test(href)) { card.target = "_blank"; card.rel = "noopener noreferrer"; }
          card.append(element("span", "jarred-contact-label", label), element("span", "jarred-contact-value", value));
          return card;
        });
        const discord = element("div", "jarred-card jarred-contact-card");
        discord.append(element("span", "jarred-contact-label", "Discord"), element("span", "jarred-contact-value", profile.discord));
        cards.push(discord);
        grid.replaceChildren(...cards);
      }
    }
  };
  const run = () => {
    const page = currentPage();
    if (document.body.dataset.jarredPortfolioApplied === page && pageIsCustomized(page)) return;
    document.body.dataset.jarredPortfolioApplied = page;
    applySharedContent();
    customizePortfolio();
    updateSocialLinks();
    updateEmailLinks();
    window.setTimeout(() => { updateSocialLinks(); updateEmailLinks(); }, 1200);
    document.title = page === "contact" ? "Contact | Jarred Encabo" : page === "services" ? "Projects | Jarred Encabo" : page === "404" ? "Page not found | Jarred Encabo" : "Jarred Encabo | Full Stack Developer";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = profile.bio;
  };
  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = "assets/jarred-portfolio.css";
  document.head.append(styles);
  let booted = false;
  const boot = () => {
    if (booted) return;
    booted = true;
    try {
      run();
      updateStats();
    } finally {
      hideLoadingScreen();
    }
  };
  const runAfterHydration = () => window.setTimeout(boot, 1800);
  const scheduleRouteRun = () => {
    if (!booted) return;
    window.setTimeout(() => { run(); updateStats(); }, 80);
  };
  ["popstate", "hashchange"].forEach((event) => window.addEventListener(event, scheduleRouteRun));
  ["pushState", "replaceState"].forEach((method) => {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      scheduleRouteRun();
      return result;
    };
  });
  window.setInterval(() => {
    if (!booted) return;
    const page = currentPage();
    updateSocialLinks();
    updateEmailLinks();
    if (document.body.dataset.jarredPortfolioApplied !== page || !pageIsCustomized(page)) scheduleRouteRun();
  }, 250);
  if (document.readyState === "complete") runAfterHydration();
  else window.addEventListener("load", runAfterHydration, { once: true });
  showLoadingScreen();
})();
