import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export interface FilterOptions {
  priceRange: [number, number];
  platforms: string[];
  categories: string[];
  showDiscounted: boolean;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  onReset,
}: FilterSidebarProps) {
  const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'];
  const categories = [
    { id: 'game', label: 'Игры', icon: 'Gamepad2' },
    { id: 'currency', label: 'Валюта', icon: 'Coins' },
  ];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const togglePlatform = (platform: string) => {
    const platforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];
    updateFilter('platforms', platforms);
  };

  const toggleCategory = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilter('categories', categories);
  };

  return (
    <Card className="border-border/50 sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={20} className="text-primary" />
            Фильтры
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 text-xs"
          >
            Сбросить
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Icon name="DollarSign" size={16} className="text-primary" />
            Цена (₽)
          </Label>
          <div className="space-y-4">
            <Slider
              min={0}
              max={10000}
              step={100}
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value)}
              className="mt-2"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="font-medium">{filters.priceRange[0]} ₽</span>
              <span className="font-medium">{filters.priceRange[1]} ₽</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Icon name="Tag" size={16} className="text-primary" />
            Категория
          </Label>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-normal cursor-pointer flex items-center gap-2"
                >
                  <Icon name={category.icon as any} size={14} />
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Icon name="Monitor" size={16} className="text-primary" />
            Платформа
          </Label>
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={filters.platforms.includes(platform)}
                  onCheckedChange={() => togglePlatform(platform)}
                />
                <Label
                  htmlFor={`platform-${platform}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {platform}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="discounted"
            checked={filters.showDiscounted}
            onCheckedChange={(checked) =>
              updateFilter('showDiscounted', checked)
            }
          />
          <Label
            htmlFor="discounted"
            className="text-sm font-normal cursor-pointer flex items-center gap-2"
          >
            <Icon name="Percent" size={14} className="text-accent" />
            Только со скидкой
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
