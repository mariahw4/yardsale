const purchaseHandler = async () => {
  // Gotta be a better way to get the id?
  const id = document.location.pathname.split("/")[3];
  const response = await fetch(`/api/listings/${id}/purchase`, {
    method: "PUT",
    body: JSON.stringify({ sold: true }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("Response: ", response);
  if (response.ok) {
    return;
  } else {
    alert(response.statusText);
  }
};

// Reload page after purchase confirmation to update with SOLD and remove Purchase btn
const reloadPage = () => location.reload();

// Take users to homepage when clicking Back To Listings btn
const homeBtnHandler = () => location.replace("/");

document
  .querySelector(".purchase-btn")
  .addEventListener("click", purchaseHandler);

document
  .querySelector(".post-purchase-btn")
  .addEventListener("click", reloadPage);

document.querySelector(".home-btn").addEventListener("click", homeBtnHandler);
