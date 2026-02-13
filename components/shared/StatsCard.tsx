import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"
import { ReactNode } from "react"

type StatsCardProps = {
  Icon?: LucideIcon
  Title?: string
  BadgeTitle?: string
  Description?: string
  BodyTitle?: string
  BodyDescription?: string
  Footer?: string
  UrlLink?: string
  Component?:ReactNode
}

function StatsCard({
  Icon,
  Title,
  BadgeTitle,
  Description,
  BodyTitle,
  BodyDescription,
  Footer,
  UrlLink,
  Component
}: StatsCardProps) {
  const hasHeader = Icon || Title || BadgeTitle
  const hasContent = Description || BodyTitle || BodyDescription
  const hasFooter = Footer || UrlLink

  return (
    <Card className="w-[320px]">
      {hasHeader && (
        <CardHeader>
          <div className="CENTER gap-4 justify-start! w-full">
            {Icon && <Icon />}
            {Title && <CardTitle className="LIGHT_BLUE">{Title}</CardTitle>}
            {BadgeTitle && (
              <Badge className="bg-orange-400 ml-auto">
                {BadgeTitle.toUpperCase()}
              </Badge>
            )}
          </div>
        </CardHeader>
      )}

      {hasContent && (
        <CardContent>
          {Description && <p className="text-gray-500">{Description}</p>}
          {
  Component&&Component
}
          {BodyTitle && <p className="H1 mt-5">{BodyTitle}</p>}
          {BodyDescription && (
            <p className="text-gray-500">{BodyDescription}</p>
          )}
        </CardContent>
      )}

      {hasFooter && (
        <CardFooter>
          <div className="CENTER justify-start gap-2 flex-col! w-full">
            {Footer && <p>{Footer}</p>}
            {UrlLink && (
              <Link href={UrlLink}>
                <Button className="BUTTON_OUTLINE w-full">View More</Button>
              </Link>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export default StatsCard
