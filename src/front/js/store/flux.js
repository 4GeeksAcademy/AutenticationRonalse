

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			setEmail: [],
			isLogged : false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: (email, password) => {
				getActions().changeColor(0, "green");
			},

			loginUser : async (email, password) => {
				const response = await fetch(
				  "https://orange-meme-jjjvx4pgr56wf7qq-3001.app.github.dev/login",
				  {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({
					  email: email,
					  password: password,
					}),
				  }
				);
				const data = await response.json();
				localStorage.setItem("token", data.token);
				if (response.ok ) {
				  getActions().settingLogIn()
				  console.log(email, password)
				  return true
				} else {
				  console.log("Error:", data);
				  console.log(email, password)
				  return false
				}
			
			  },

			  registerUser : async (email, password) => {

				const response = await fetch(
				  "https://orange-meme-jjjvx4pgr56wf7qq-3001.app.github.dev/signup",
				  {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({
					  email: email,
					  password: password,
					}),
				  }
				);
				const data = await response.json();
				if (response.ok) {
				  console.log("succes", data)
				  return true
				} else {
				  console.log("Error:", data);
				  return false
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			settingLogIn: () => {
				setStore({isLogged: true})
			},

			logOut: () => {
				setStore({isLogged: false})
			},


			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
