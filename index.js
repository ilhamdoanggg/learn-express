import {app} from './src/app'

app()
    .then((server)=>{
        server.listen(process.env.APP_PORT, ()=>{
            console.log(`Application started on port ${process.env.APP_PORT}`)
        })
    })
    .catch((error)=>{
        console.log(`Application failed to start.......`)
        console.log(error)
    })
