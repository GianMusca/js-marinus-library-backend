exports.showProfile = (req, res) => {
  const id = req.params.id;
  res.send(`🧑‍💻 Perfil del usuario con ID: ${id}`);
};

exports.createUser = (req, res) => {
  const { nombre } = req.body;
  res.send(`✅ Usuario ${nombre} creado con éxito`);
};