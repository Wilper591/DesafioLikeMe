const url_base = "https://likeme-50ph.onrender.com/apiV1/likeme";

$(document).ready(function () {
  $("form:first").submit(async (e) => {
    e.preventDefault();
    let titulo = $("form:first input:first").val();
    let img = $("form:first input:last").val();
    let descripcion = $("form:first textarea").val();
    const { data } = await axios.post(url_base + "/post", {
      titulo,
      img,
      descripcion,
    });

    $("#creado").removeClass("d-none");
    getPosts();
  });
});

async function getPosts() {
  const { data } = await axios.get(url_base + "/posts");
  $(".posts").html("");
  $.each(data.post, (i, u) => {
    $(".posts").append(`
      <div class="card col-12 col-sm-4 d-inline mx-0 px-3">
        <div class="card-body  p-0">
          <img
            class="card-img-top"
            src="${u.img}"
            style="width: 100%"
          />
          <div class="p-3">
            <h4 class="card-title">${u.titulo}</h4>
            <p class="card-text">
              ${u.descripcion}
            </p>
            <div class="d-flex justify-content-between">
                <div>
                    ${
                    u.likes
                        ? `<svg
                    id="Heart"
                    style="width: 50px; height: 50px"
                    viewBox="0 0 24 24"
                    onclick="like(${u.id})"
                    >
                    <path
                        fill="red"
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                    />
                    </svg>`
                        : `
                    <svg
                    id="heart"
                    style="width: 50px; height: 50px"
                    viewBox="0 0 24 24"
                    onclick="like(${u.id})"
                    >
                    <path
                        fill="currentColor"
                        d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                    />
                    </svg>`
                    } 
                    <h5 class="d-inline"> ${u.likes || 0} </h5>
                </div>
                <svg style="width: 50px; height: 50px"
                    onclick="deletePost(${u.id})"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </div>
          </div>
        </div>
      </div>
    `);
  });
}

function like(id) {
  axios.put(`${url_base}/post/?id=${id}`).then(() => {
    getPosts();
  });
}

function deletePost(id) {
    axios.delete(`${url_base}/post/${id}`).then(() => {
        getPosts();
    });
}

getPosts();
