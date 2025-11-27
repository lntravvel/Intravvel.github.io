# Intravvel Site Mapping

This document maps the visible elements of `https://intravvel.vercel.app/` to the new database schema and API endpoints.

## 1. Services (Travel Packages)

**Frontend Location:** Homepage "Popular Packages" or "/packages" route.
**Inferred Fields:**
- `Title`: "Bali Experience", "Paris Getaway"
- `Price`: "$1200", "$999" (Stored as string or number)
- `Image`: URL to unsplash or assets.
- `Description`: Short blurb about the trip.
- `Duration`: "5 Days / 4 Nights"

**DB Schema (`Service`):**
- `title` (String)
- `description` (String)
- `price` (Number)
- `duration` (String)
- `imageUrl` (String)
- `featured` (Boolean)

**API Endpoint:** `GET /api/v1/services`

## 2. Contact Form

**Frontend Location:** Footer or "/contact" page.
**Inferred Fields:**
- `Name`: Input `name="user_name"` or similar.
- `Email`: Input `name="user_email"`.
- `Subject`: Input `name="subject"`.
- `Message`: Textarea `name="message"`.

**DB Schema (`Message`):**
- `name` (String)
- `email` (String)
- `subject` (String)
- `message` (String)
- `status` (Enum: 'new', 'read', 'archived')

**API Endpoint:** `POST /api/v1/contact`

## 3. Site Content (CMS)

**Frontend Location:** Homepage Hero, About Section.
**Inferred Structure:**
- `hero`: Title, Subtitle, Background Image URL.
- `about`: Heading, Paragraph text.
- `contact_info`: Address, Phone, Email displayed in footer.

**DB Schema (`SiteContent`):**
- `section` (String, unique index. e.g., 'hero', 'about')
- `data` (Object, flexible structure based on section)

**API Endpoint:** `GET /api/v1/site-content?section=hero`

## 4. Authentication

**Status:** Current site has no visible login.
**Implementation:** Added `/admin` route in this dashboard.
**DB Schema (`User`):**
- `email` (String)
- `password` (Hash)
- `role` (String: 'admin')

**API Endpoint:** `POST /api/v1/auth/login`
