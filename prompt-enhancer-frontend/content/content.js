console.log("AI Input Enhancer content script loaded");

async function fetchEnhancedPrompts(prompt) {
    try {
        const response = await fetch("http://localhost:8000/refine", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            alert("Error occured in getting prompts");
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data.prompts;
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return [];
    }
}

function createEnhanceButtonForChatgpt(inputEl) {
    const parent = document.querySelector('form[data-type="unified-composer"]');
    const button = document.createElement("button");
    button.className = "ai-enhance-btn";

    const loader = document.createElement("div");
    loader.id = "loader";
    loader.className = "loader hidden";

    const extensionImage = document.createElement('img');
    extensionImage.src = chrome.runtime.getURL("assets/extension-icon.png");
    extensionImage.alt = "Enhance Icon";
    extensionImage.width = 25;
    extensionImage.height = 25;

    button.appendChild(extensionImage);
    button.appendChild(loader);

    button.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputEl.innerText == "") {
            alert("Please write a prompt first");
        } else {
            extensionImage.style.display = "none";
            loader.classList.remove("hidden");
            const result = await fetchEnhancedPrompts(inputEl.innerText);
            if (result.length > 0) {
                extensionImage.style.display = "block";
                loader.classList.add("hidden");
                showEnhanceModal(result, inputEl);
            } else {
                extensionImage.style.display = "block";
                loader.classList.add("hidden");
                alert("No Prompt Generated, please try again");
            }
        }
    });

    parent.style.position = "relative";
    parent.appendChild(button);
}

function createEnhanceButtonForGemini(inputEl) {
    const parent = document.querySelector("rich-textarea");
    const button = document.createElement("button");
    button.className = "ai-enhance-btn-gemini";

    const loader = document.createElement("div");
    loader.id = "loader";
    loader.className = "loader hidden";

    const extensionImage = document.createElement('img');
    extensionImage.src = chrome.runtime.getURL("assets/extension-icon.png");
    extensionImage.alt = "Enhance Icon";
    extensionImage.width = 25;
    extensionImage.height = 25;

    button.appendChild(extensionImage);
    button.appendChild(loader);

    button.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputEl.innerText == "") {
            alert("Please write a prompt first");
        } else {
            extensionImage.style.display = "none";
            loader.classList.remove("hidden");
            const result = await fetchEnhancedPrompts(inputEl.innerText);
            if (result.length > 0) {
                extensionImage.style.display = "block";
                loader.classList.add("hidden");
                showEnhanceModal(result, inputEl);
            } else {
                extensionImage.style.display = "block";
                loader.classList.add("hidden");
                alert("No Prompt Generated, please try again");
            }
        }
    });

    parent.style.position = "relative";
    parent.appendChild(button);
}

function createEnhanceButtonForClaude(inputEl) {
    const parent = document.querySelector('div[contenteditable="true"][role="textbox"]');
    const wrapper = parent.closest("div.relative");
    if (!wrapper) return;

    const button = document.createElement("button");
    button.className = "ai-enhance-btn-claude";

    const loader = document.createElement("div");
    loader.id = "loader";
    loader.className = "loader hidden";

    const extensionImage = document.createElement('img');
    extensionImage.src = chrome.runtime.getURL("assets/extension-icon.png");
    extensionImage.alt = "Enhance Icon";
    extensionImage.width = 25;
    extensionImage.height = 25;

    button.appendChild(extensionImage);
    button.appendChild(loader);

    button.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputEl.innerText == "") {
            alert("Please write a prompt first");
        } else {
            extensionImage.style.display = "none";
            loader.classList.remove("hidden");
            const result = await fetchEnhancedPrompts(inputEl.innerText);
            if (result.length > 0) {
                extensionImage.style.display = "block";
                loader.classList.add("hidden");
                showEnhanceModal(result, inputEl);
            } else {
                extensionImage.style.display = "block";
                loader.classList.add("hidden");
                alert("No Prompt Generated, please try again");
            }
        }
    });

    wrapper.appendChild(button);
}

let buttonForPerplexity = document.createElement("button");
buttonForPerplexity.className = "ai-enhance-btn-perplexity";

function createEnhanceButtonForPerplexity(inputEl) {
    const parent = document.querySelector('div[contenteditable="true"][role="textbox"]');

    const wrapper = parent.closest("div.relative.rounded-2xl");
    if (!wrapper) return;

    const loader = document.createElement("div");
    loader.id = "loader";
    loader.className = "loader hidden";

    const extensionImage = document.createElement('img');
    extensionImage.src = chrome.runtime.getURL("assets/extension-icon.png");
    extensionImage.alt = "Enhance Icon";
    extensionImage.width = 25;
    extensionImage.height = 25;

    buttonForPerplexity.appendChild(extensionImage);
    buttonForPerplexity.appendChild(loader);

    buttonForPerplexity.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const spanInsideInput = inputEl?.querySelector('span');

        if (!spanInsideInput) {
            alert("Please type something before using this feature!");
            return;
        }

        extensionImage.style.display = "none";
        loader.classList.remove("hidden");
        const result = await fetchEnhancedPrompts(inputEl.innerText);
        if (result.length > 0) {
            extensionImage.style.display = "block";
            loader.classList.add("hidden");
            showEnhanceModalForPerplexity(result);
        } else {
            extensionImage.style.display = "block";
            loader.classList.add("hidden");
            alert("No Prompt Generated, please try again");
        }
    });

    wrapper.appendChild(buttonForPerplexity);
}

function findInputBox() {
    const site = window.location.hostname;

    if (site.includes("chatgpt.com")) {
        let inputBox = document.getElementById('prompt-textarea');
        if (inputBox) {
            return [inputBox.querySelector('p'), "chatgpt"];
        } else {
            return [document.querySelector("textarea"), "chatgpt"];
        }
    } else if (site.includes("gemini.google.com")) {
        const textbox = document.querySelector('div[role="textbox"]');
        return [textbox.querySelector("p"), "gemini"];
    } else if (site.includes("claude.ai")) {
        const textbox = document.querySelector('div[role="textbox"]');
        return [textbox.querySelector("p"), "claude"];
    } else if (site.includes("perplexity.ai")) {
        const textbox = document.getElementById("ask-input");
        return [textbox.querySelector("p"), "perplexity"];
    }
}

function showEnhanceModal(prompts, inputEl) {
    const oldModal = document.querySelector(".ai-enhance-modal");
    if (oldModal) oldModal.remove();

    const overlay = document.createElement("div");
    overlay.className = "ai-enhance-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "ai-enhance-modal";

    const modalHeader = document.createElement("h1");
    modalHeader.className = "ai-enhance-modal-header";
    modalHeader.innerText = "Your Refined Prompts";

    const promptList = document.createElement("div");
    promptList.className = "ai-enhance-modal-list";

    prompts.forEach(prompt => {
        const item = document.createElement("div");
        item.className = "ai-enhance-modal-item";
        item.innerText = prompt;
        promptList.appendChild(item);
    });

    const actions = document.createElement("div");
    actions.className = "ai-enhance-modal-actions";

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.onclick = () => overlay.remove();

    actions.appendChild(closeBtn);

    modal.appendChild(modalHeader);
    modal.appendChild(promptList);
    modal.appendChild(actions);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.querySelectorAll(".ai-enhance-modal-item").forEach(item => {
        item.addEventListener('click', () => {
            const chosenText = item.innerText;

            inputEl.innerText = chosenText;

            modal.remove();
            overlay.remove();
        });
    });
}

function showEnhanceModalForPerplexity(prompts) {
    const oldModal = document.querySelector(".ai-enhance-modal");
    if (oldModal) oldModal.remove();

    const overlay = document.createElement("div");
    overlay.className = "ai-enhance-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "ai-enhance-modal";

    const modalHeader = document.createElement("h1");
    modalHeader.className = "ai-enhance-modal-header";
    modalHeader.innerText = "Your Refined Prompts";

    const modalDesc = document.createElement("p");
    modalDesc.className = ".ai-enhance-modal-desc";
    modalDesc.innerText = "Please copy your desired prompt from here, perplexity doesn't support direct prompt selection 😢";

    const promptList = document.createElement("div");
    promptList.className = "ai-enhance-modal-list";

    prompts.forEach(prompt => {
        const item = document.createElement("div");
        item.className = "ai-enhance-modal-item-perplexity";
        item.innerText = prompt;
        promptList.appendChild(item);
    });

    const actions = document.createElement("div");
    actions.className = "ai-enhance-modal-actions";

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.onclick = () => overlay.remove();

    actions.appendChild(closeBtn);

    modal.appendChild(modalHeader);
    modal.appendChild(modalDesc);
    modal.appendChild(promptList);
    modal.appendChild(actions);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

}

function initEnhancer() {
    const inputBox = findInputBox();
    if (inputBox[1] == "chatgpt") {
        createEnhanceButtonForChatgpt(inputBox[0]);
    } else if (inputBox[1] == "gemini") {
        createEnhanceButtonForGemini(inputBox[0]);
    } else if (inputBox[1] == "claude") {
        createEnhanceButtonForClaude(inputBox[0]);
    } else if (inputBox[1] == "perplexity") {
        createEnhanceButtonForPerplexity(inputBox[0]);
    } else {
        console.log("No input box found");
    }
}

setTimeout(initEnhancer, 2000);
