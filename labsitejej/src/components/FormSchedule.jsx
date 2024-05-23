import React, { useState } from 'react';
import { useForm } from "react-hook-form"

    function EventForm({dateSelected}) {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }

    // Fonctions de gestion des changements pour chaque input
    // instanceof verif que dateSelected est bien une instance de Date
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"p-4 contents w-full flex-wrap space-y-2"}>
            <div>
                <p className={"text-white font-mono antialiased tracking-normal text-base font-black"}>Nom
                    impression</p>
                <input {...register("nameImpression",
                    {required: true, maxLength: 20, minLength: 3})}
                       className={"p-2 rounded-md"} placeholder={"nom impression..."}/>
            </div>

            <div>
                <p className={"text-white font-mono antialiased tracking-normal text-base font-black"}>déscription utilisation</p>
                <textarea {...register("description",
                    {required: true, maxLength: 300, minLength: 10})}
                          className={"p-2  overflow-auto resize-none rounded-md "}
                          placeholder={"déscription impression..."}>
                </textarea>
            </div>

            <div>
                <p className={"text-white font-mono antialiased tracking-normal text-base font-black"}>durée utilisation</p>
                <input {...register("dureeutilisation",
                    {required: true})}/>
            </div>

            <div>
                <p className={"text-white font-mono antialiased tracking-normal text-base font-black"}>choix machine</p>
                <select {...register("machine",
                    {required: true})}
                        className={"p-2 rounded-md"}>
                    <option value="imprimante">imprimante 3d</option>
                    <option value="server">serveur</option>
                    <option value="other">other</option>
                </select>
            </div>

            <input type="submit" className={"p-2 mt-12 rounded-md bg-red-800 hover:bg-red-600 text-white"}/>
        </form>
);
}

export default EventForm;
