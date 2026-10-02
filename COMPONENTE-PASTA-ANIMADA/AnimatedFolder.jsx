import { Children, cloneElement, isValidElement, useState } from 'react';
import './AnimatedFolder.css';

const darkenColor = (hex, percent) => {
	let color = hex.replace('#', '');
	if (color.length === 3) color = color.split('').map(character => character + character).join('');
	const value = parseInt(color.slice(0, 6), 16);
	const channel = shift => Math.max(0, Math.floor(((value >> shift) & 255) * (1 - percent)));
	return `#${[channel(16), channel(8), channel(0)].map(value => value.toString(16).padStart(2, '0')).join('')}`;
};

function createPreview(preview, index) {
	if (isValidElement(preview)) return preview;
	if (typeof preview === 'string') {
		return <button type="button" aria-label="Open preview"><img src={preview} alt="" loading="lazy" /></button>;
	}

	const { src, image, thumbnail, alt = '', title, label, href, onClick } = preview;
	const imageSource = src || image || thumbnail;
	const content = (
		<>
			{imageSource ? <img src={imageSource} alt={alt} loading="lazy" /> : null}
			{label || title ? <span>{label || title}</span> : null}
		</>
	);

	if (href) {
		return <a key={index} href={href} aria-label={alt || title || label}>{content}</a>;
	}
	if (onClick) {
		return <button key={index} type="button" onClick={onClick} aria-label={alt || title || label}>{content}</button>;
	}
	return <div key={index} className="rb-folder__preview">{content}</div>;
}

export default function AnimatedFolder({
	title = 'Portfolio',
	eyebrow = 'Portfolio',
	subtitle = 'Explore projects +',
	closeSubtitle = 'Close folder −',
	openLabel = 'Open folder',
	closeLabel = 'Close folder',
	color = '#a77550',
	size = 3,
	onClick,
	href,
	projectCount,
	className = '',
	children,
	items,
	previews,
	thumbnail,
	image,
	frame,
}) {
	const [open, setOpen] = useState(false);
	const [offsets, setOffsets] = useState({});
	const childItems = Children.toArray(children);
	const previewItems = previews?.map((preview, index) => cloneElement(createPreview(preview, index), { key: index })) || [];
	const imagePreview = thumbnail || image ? [
		<button key="image-preview" type="button" aria-label={`Open ${title} preview`}>
			<img src={thumbnail || image} alt="" loading="lazy" />
		</button>,
	] : [];
	const contentItems = items || (childItems.length ? childItems : previewItems.length ? previewItems : frame ? [frame] : imagePreview);
	const paperItems = contentItems.slice(0, 3);

	function move(event, index) {
		if (!open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const rect = event.currentTarget.getBoundingClientRect();
		setOffsets(current => ({
			...current,
			[index]: {
				x: (event.clientX - rect.left - rect.width / 2) * 0.06,
				y: (event.clientY - rect.top - rect.height / 2) * 0.06,
			},
		}));
	}

	function activate(event) {
		if (!href) {
			setOpen(value => !value);
			setOffsets({});
		}
		onClick?.(event);
	}

	const triggerProps = {
		className: 'rb-folder__trigger',
		'aria-label': `${open ? closeLabel : openLabel} ${title}`,
		'aria-expanded': href ? undefined : open,
		onClick: activate,
	};

	return (
		<div
			className={`rb-folder-stage animated-folder ${className}`}
			style={{
				'--folder-size': size,
				'--folder-color': color,
				'--folder-back-color': darkenColor(color, 0.18),
			}}
			data-project-count={projectCount}
		>
			<div className={`rb-folder ${open ? 'is-open' : ''}`}>
				<div className="rb-folder__back" data-paper-count={paperItems.length}>
					{paperItems.map((item, index) => (
						<div
							key={index}
							className={`rb-folder__paper rb-folder__paper--${index + 1}`}
							aria-hidden={!open}
							inert={open ? undefined : ''}
							onMouseMove={event => move(event, index)}
							onMouseLeave={() => setOffsets(current => ({ ...current, [index]: { x: 0, y: 0 } }))}
							style={{
								'--magnet-x': `${offsets[index]?.x || 0}px`,
								'--magnet-y': `${offsets[index]?.y || 0}px`,
							}}
						>
							<div className="rb-folder__content">{item}</div>
						</div>
					))}
					<div className="rb-folder__front" aria-hidden="true" />
					<div className="rb-folder__front rb-folder__front--right" aria-hidden="true" />
					{href ? (
						<a {...triggerProps} href={href}>
							<span className="rb-folder__mark">{eyebrow}</span>
							<span className="rb-folder__label">{title}</span>
							<span className="rb-folder__hint">{subtitle}</span>
						</a>
					) : (
						<button type="button" {...triggerProps}>
							<span className="rb-folder__mark">{eyebrow}</span>
							<span className="rb-folder__label">{title}</span>
							<span className="rb-folder__hint">{open ? closeSubtitle : subtitle}</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
