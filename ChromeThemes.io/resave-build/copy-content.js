/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////                 Additions                 /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "applyTheme") {
      const { colors } = message;
      applyTheme(colors);
    }
  });
  
  function applyTheme(colors) {
    const elements = document.querySelectorAll<HTMLElement>("body, body *");
  
    elements.forEach((element, index) => {
      switch (colors.length) {
        case 2:
          element.style.backgroundColor = index % 2 === 0 ? colors[0] : colors[1];
          element.style.color = index % 2 === 0 ? colors[1] : colors[0];
          break;
        case 3:
          element.style.backgroundColor = colors[index % 3];
          element.style.color = colors[(index + 1) % 3];
          break;
        case 4:
          element.style.backgroundColor = colors[index % 4];
          element.style.color = colors[(index + 2) % 4];
          break;
        case 5:
          element.style.backgroundColor = colors[index % 5];
          element.style.color = colors[(index + 3) % 5];
          break;
        default:
          element.style.backgroundColor = colors[0];
          element.style.color = colors[1];
          break;
      }
    });
  }




/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////                 Edits                 /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
