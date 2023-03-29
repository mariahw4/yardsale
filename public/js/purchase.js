const purchaseHandler = async () => {
  // Gotta be a better way to get the id? delete
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

document
  .querySelector(".purchase-btn")
  .addEventListener("click", purchaseHandler);
