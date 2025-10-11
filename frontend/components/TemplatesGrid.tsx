import { templates } from "@/config/templates.config";
import TemplateCard from "./TemplateCard";

export default function TemplatesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {templates.map((template, index) => (
        <TemplateCard key={template.id} template={template} index={index} />
      ))}
    </div>
  );
}
