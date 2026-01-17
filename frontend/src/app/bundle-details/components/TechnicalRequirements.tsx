import Icon from '@/components/ui/AppIcon';

interface Requirement {
  category: string;
  items: string[];
}

interface TechnicalRequirementsProps {
  requirements: Requirement[];
}

const TechnicalRequirements = ({ requirements }: TechnicalRequirementsProps) => {
  return (
    <div className="space-y-6">
      {requirements.map((req, idx) => (
        <div key={idx} className="bg-muted rounded-lg p-5">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="ComputerDesktopIcon" size={20} variant="outline" className="text-primary" />
            {req.category}
          </h3>
          <ul className="space-y-2">
            {req.items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start gap-3">
                <Icon
                  name="CheckIcon"
                  size={16}
                  variant="outline"
                  className="text-success flex-shrink-0 mt-0.5"
                />
                <span className="text-text-primary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TechnicalRequirements;