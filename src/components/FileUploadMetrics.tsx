import { useState } from "react";
import axios from "axios";

const FileUploadMetrics = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/metrics/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMetrics(response.data);
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
      alert("Hubo un error al enviar el archivo al servidor.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Subir archivo para calcular métricas</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Enviar archivo
      </button>

      {metrics && (
        <div className="mt-4">
          <h3 className="font-semibold">Métricas calculadas:</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2">{JSON.stringify(metrics, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploadMetrics;
