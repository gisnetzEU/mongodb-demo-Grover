const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB...')

    const cursoSchema = new mongoose.Schema({
      nombre: String,
      autor: String,
      etiquetas: [String],
      fecha: { type: Date, default: Date.now },
      publicado: Boolean
    });

    //Clases ->Objetos
    //Persona -Carlos, Pedro

    const Curso = mongoose.model('Curso', cursoSchema);

    async function crearCurso() {
      const curso = new Curso({
        nombre: 'Angular para principiantes',
        autor: 'Pedro',
        etiquetas: ['desarrollo web', 'front end'],
        publicado: true
      })

      const resultado = await curso.save();
      console.log(resultado);
    }

    //crearCurso();

    async function listarCursos() {

      //.find({ autor: /verr$/ })

      const numeroPage = 2;
      const sizePage = 10;

      const cursos = await Curso
        .find({ autor: /.*ro.*/ })
        .skip((numeroPage - 1) * sizePage)
        .limit(sizePage)
        .sort({ autor: -1 })
        .select({ autor: 1, nombre: 1, etiquetas: 1 });
      console.log(cursos);
    }
    //listarCursos();

    async function actualizarCurso(id) {
      /* const curso = await Curso.findById(id);
      if (!curso) {
        console.log('El curso no existe');
        return;
      }
      curso.publicado = false;
      curso.autor = 'Grover Vásquez';

      // curso.set({
      //     publicado: false,
      //     autor: 'Grover Vásquez'
      // })
      const resultado = await curso.save();
      console.log(resultado); */
      const resultado = await Curso.findByIdAndUpdate(id, {
        $set: {
          autor: 'Luis Perez',
          publicado: false
        }
      }, { new: true });
      console.log(resultado);

    }
    //actualizarCurso('612cc91ea3f95f0d181f978f');
    async function eliminarDocumento(id) {
      const result = await Curso.deleteOne({ _id: id });
      //const resultado = await Curso.findByIdAndDelete(id);
      console.log(result);
    }
    eliminarDocumento('612cc91ea3f95f0d181f978f');

  })
  .catch(err => console.log('No se pudo conectar a MongoDB..', err));

  //https://stackoverflow.com/questions/68971062/find-method-not-working-withn-an-async-functionin-mongoose