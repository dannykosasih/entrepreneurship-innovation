import bmcChannels from '../assets/canvas-icons/bmc-channels.svg?raw';
import bmcCostStructure from '../assets/canvas-icons/bmc-cost-structure.svg?raw';
import bmcCustomerRelationships from '../assets/canvas-icons/bmc-customer-relationships.svg?raw';
import bmcCustomerSegments from '../assets/canvas-icons/bmc-customer-segments.svg?raw';
import bmcKeyActivities from '../assets/canvas-icons/bmc-key-activities.svg?raw';
import bmcKeyPartners from '../assets/canvas-icons/bmc-key-partners.svg?raw';
import bmcKeyResources from '../assets/canvas-icons/bmc-key-resources.svg?raw';
import bmcRevenueStreams from '../assets/canvas-icons/bmc-revenue-streams.svg?raw';
import bmcValuePropositions from '../assets/canvas-icons/bmc-value-propositions.svg?raw';
import vpcCustomerJobs from '../assets/canvas-icons/vpc-customer-jobs.svg?raw';
import vpcGainCreators from '../assets/canvas-icons/vpc-gain-creators.svg?raw';
import vpcGains from '../assets/canvas-icons/vpc-gains.svg?raw';
import vpcPainRelievers from '../assets/canvas-icons/vpc-pain-relievers.svg?raw';
import vpcPains from '../assets/canvas-icons/vpc-pains.svg?raw';
import vpcProductsServices from '../assets/canvas-icons/vpc-products-services.svg?raw';

export const CANVAS_ICONS = {
  'bmc-channels': bmcChannels,
  'bmc-cost-structure': bmcCostStructure,
  'bmc-customer-relationships': bmcCustomerRelationships,
  'bmc-customer-segments': bmcCustomerSegments,
  'bmc-key-activities': bmcKeyActivities,
  'bmc-key-partners': bmcKeyPartners,
  'bmc-key-resources': bmcKeyResources,
  'bmc-revenue-streams': bmcRevenueStreams,
  'bmc-value-propositions': bmcValuePropositions,
  'vpc-customer-jobs': vpcCustomerJobs,
  'vpc-gain-creators': vpcGainCreators,
  'vpc-gains': vpcGains,
  'vpc-pain-relievers': vpcPainRelievers,
  'vpc-pains': vpcPains,
  'vpc-products-services': vpcProductsServices,
};

export const BMC_BLOCK_ICONS = {
  keyPartners: 'bmc-key-partners',
  keyActivities: 'bmc-key-activities',
  keyResources: 'bmc-key-resources',
  valuePropositions: 'bmc-value-propositions',
  customerRelationships: 'bmc-customer-relationships',
  channels: 'bmc-channels',
  customerSegments: 'bmc-customer-segments',
  costStructure: 'bmc-cost-structure',
  revenueStreams: 'bmc-revenue-streams',
};

export const VPC_BLOCK_ICONS = {
  products: 'vpc-products-services',
  painRelievers: 'vpc-pain-relievers',
  gainCreators: 'vpc-gain-creators',
  jobs: 'vpc-customer-jobs',
  pains: 'vpc-pains',
  gains: 'vpc-gains',
};

function prepareMarkup(svg, decorative) {
  let out = String(svg).replace(/\s(?:width|height)="[^"]*"/g, '');
  if (decorative) {
    out = out
      .replace(/\srole="[^"]*"/g, '')
      .replace(/\saria-label="[^"]*"/g, '')
      .replace(/<title>[\s\S]*?<\/title>/g, '');
  }
  return out;
}

export function CanvasIcon({
  name,
  size = 24,
  decorative = true,
  className = '',
  title,
}) {
  const markup = CANVAS_ICONS[name];
  if (!markup) return null;
  return (
    <span
      className={`canvas-icon ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden={decorative ? 'true' : undefined}
      title={decorative ? undefined : title}
      dangerouslySetInnerHTML={{ __html: prepareMarkup(markup, decorative) }}
    />
  );
}
