import Alpine from "alpinejs";
import CTFd from "../index.js";

window.alpine = Alpine;
window.CTFd = CTFd;

Alpine.data("CampusList", () => ({
    campuses: [],

    async init() {
        let response = await CTFd.fetch(`/api/v1/campuses?type=${CTFd.config.userMode}`, {
            method: "GET",
        });

        if (!response.ok) {
            Toastify({
                text: "Failed to load campuses",
                duration: 3000,
                gravity: "bottom",
                position: 'center',
                backgroundColor: "red",
            }).showToast();
            return;
        }

        const body = await response.json();
        this.campuses = body["data"];

        Toastify({
            text: "Campuses loaded",
            duration: 3000,
            gravity: "bottom",
            position: 'center',
            backgroundColor: "green",
        }).showToast();
    },

    async saveCampus(campus) {
        var text = "Campus saved";
        var backgroundColor = "green";

        if (campus.newly_created === true) {
            var response = await CTFd.fetch(`/api/v1/campuses`, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(campus),
            });
            if (!response.ok) {
                text = "Failed to save campus";
                backgroundColor = "red";
            } else {
                delete campus.newly_created;
                campus.id = (await response.json()).data.id;
            }
        } else {
            var response = await CTFd.fetch(`/api/v1/campuses/${campus.id}`, {
                method: "PATCH",
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(campus),
            });
            if (!response.ok) {
                text = "Failed to save campus";
                backgroundColor = "red";
            }
        }
        Toastify({
            text,
            backgroundColor,
            duration: 3000,
            gravity: "bottom",
            position: 'center',
        }).showToast();
    },

    async addCampus() {
        this.campuses.push({
            id: null,
            name: "",
            description: "",
            slug: "",
            type: "users",
            newly_created: true,
        });
    },

    async deleteCampus(campus) {
        if (confirm("Are you sure you'd like to delete this campus?")) {
            var text = "Campus deleted";
            var backgroundColor = "green";

            if (campus.newly_created === undefined) {
                var response = await CTFd.fetch(`/api/v1/campuses/${campus.id}`, {
                    method: "DELETE",
                    credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    text = "Failed to delete campus";
                    backgroundColor = "red";
                }
            }
            this.campuses = this.campuses.filter(c => c.id !== campus.id);
            Toastify({
                text,
                backgroundColor,
                duration: 3000,
                gravity: "bottom",
                position: 'center',
            }).showToast();
        }
    },
}));

Alpine.start();