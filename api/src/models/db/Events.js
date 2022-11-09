const { Schema, model } = require("mongoose");
// const Categories = require('./Categories.js')
const EventSchema = new Schema(
   {
      title: String,
      categories: [
         {
            type: Schema.Types.ObjectId,
            ref: "Categories",
         },
      ],
      otherCategorie: [String],
      shortDescription: String,
      longDescription: String,
      pictures: [
         {
            picture: String,
            cover: Boolean,
         },
      ],
      online: String,
      link: String,
      departamento: String,
      municipio: String,
      direccion: String,
      barrio: String,

      specialRequires: String,

      dates: [
         {
            date: String,
            start: String,
            end: String,
            year: Number,
            cupos: String,
            price: String,
            sells: Number,
            isPublic: Boolean,
            precioAlPublico: String,
            gananciaCupo: String,
            gananciaEvento: String,
            inRevision: {
               type: Boolean,
               default: false,
            },
            dateFormated: String,
            codigos: [
               {
                  codigo: { type: String, default: "" },
                  descuento: { type: Number, default: 0 },
                  cantidad: { type: Number, default: 0 },
                  cod: { type: Boolean, default: false },
                  show: { type: Boolean, default: true },
                  ed: { type: Boolean, default: false },
                  uses: { type: Number, default: 0 },
               },
            ],
         },
      ],
      notificaciones: [
         {
            image: String,
            description: String,
            user: String,
            date: {
               type: Date,
               default: Date.now(),
            },
         },
      ],

      isPublic: {
         type: Boolean,
      },
      inRevision: {
         type: Boolean,
         default: false,
      },

      rating: {
         type: Number,
         default: 0,
      },

      organizer: {
         type: Schema.Types.ObjectId,
         ref: "Users",
      },

      opinions: [
         {
            title: {
               type: String,
            },
            time: {
               type: Date,
               default: Date.now(),
            },
            rating: Number,
            opinion: String,
            picture: {
               type: String,
               default: null,
            },
         },
      ],
   },
   { timestamps: true }
);

module.exports = model("Events", EventSchema);
