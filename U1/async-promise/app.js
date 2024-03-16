function getUsers(){
    setTimeout(()=>{
        const users = [
            {
                name: "rogelio",
                years: 22,
            },
            {
                name: "luis",
                years: 30,
            }
        ];

        callback(users)
    }, 2000);
}

function getInfoWithPromise(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const users = [
                {
                    name: "rogelio",
                    years: 22,
                },
                {
                    name: "luis",
                    years: 30,
                }
            ];
    
            resolve(users)
        }, 2000);
    });
}

function getUserWithPromise(name){
    const promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const users = [
                {
                    name: "rogelio",
                    years: 22,
                },
                {
                    name: "luis",
                    years: 30,
                }
            ];
    
            resolve(users)
        }, 2000);
    });

    return promise;
}

function getInfo(name, callback){
    setTimeout(()=>{
        const error = null;
        const saludo = "Hola" + name + ", como estas?";
        if(name === "rogelio"){
            error = new Error("Esta es la persona!")
        }
        callback(saludo);
    }, 5000);
}

getUsers((users)=>{
    for(let i=0; i< users.lenght; i++){
        getInfo(users[i].name, (saludo, error)=>{
            if(error !== null){
                console.log("Existe un error: ", error);
            }
            console.log(saludo)
        });
    };
})

getUserWithPromise()
    .then((users)=>{
        let newResponses = [];
        for(let i=0; i< users.lenght; i++){
            newResponses.push(getInfoWithPromise(users[i].name))
        }
        return Promise.all(newResponses);
    })
    .then((info)=>{
        console.log(info);
    })
    .catch((error)=>{
        console.log('error en la promesa: ', error);
    });

async function main(){
    let users = await getUserWithPromise();
    for(let i=0; i< users.lenght; i++){
        try{
          let saludo = await getInfoWithPromise(users[i].name);
            console.log(saludo);
        } 
        catch(error){
            console.log('error en la promesa: ', error); 
        }
    }
        
}

