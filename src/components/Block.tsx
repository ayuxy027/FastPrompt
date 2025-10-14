import React, { useId } from 'react';

interface BlockProps {
    zIndex?: number;
    height?: string;
    width?: string;
    lineColor?: string;
    lineDirection?: 'right' | 'left' | 'center';
    lineCount?: number;
    strokeWidth?: number;
    className?: string;
    position?: 'absolute' | 'relative' | 'static';
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    opacity?: number;
    borderColor?: string;
    borderWidth?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
}

const Block: React.FC<BlockProps> = ({
    zIndex = 1,
    height = 'h-20',
    width = 'w-full',
    lineColor = 'stroke-orange-200',
    lineDirection = 'center',
    lineCount = 17,
    strokeWidth = 1,
    className = '',
    position = 'absolute',
    top = 'top-1/2',
    left = 'left-0',
    right = 'right-0',
    bottom = '',
    opacity = 1,
    borderColor = 'border-orange-200',
    borderWidth = 'border-y',
    borderStyle = 'border-dashed'
}) => {
    // Calculate line direction offset
    const getLineDirectionOffset = (direction: string) => {
        switch (direction) {
            case 'right':
                return 8; // Lines going towards right
            case 'left':
                return -8; // Lines going towards left
            case 'center':
            default:
                return 0; // Centered lines
        }
    };

    // Generate line paths based on direction
    const generateLinePaths = () => {
        const offset = getLineDirectionOffset(lineDirection);
        return Array.from({ length: lineCount }, (_, i) => {
            const lineOffset = i * 8;
            let d;

            switch (lineDirection) {
                case 'right':
                    d = `M${-106 + lineOffset} 110L${22 + lineOffset + offset} -18`;
                    break;
                case 'left':
                    d = `M${-106 + lineOffset + offset} 110L${22 + lineOffset} -18`;
                    break;
                case 'center':
                default:
                    d = `M${-106 + lineOffset} 110L${22 + lineOffset} -18`;
                    break;
            }

            return (
                <path
                    key={i}
                    d={d}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className={lineColor}
                />
            );
        });
    };

    // Build position classes
    const positionClasses = [
        position,
        top,
        left,
        right,
        bottom
    ].filter(Boolean).join(' ');

    // Build border classes - fix the border style class generation
    const borderClasses = [
        borderWidth,
        `border-${borderStyle}`,
        borderColor
    ].join(' ');

    // Generate a stable id suitable for SSR/CSR without randomness
    const patternId = `diagonal-block-pattern-${useId().replace(/[:]/g, '')}`;

    return (
        <div
            className={`${positionClasses} ${className}`}
            style={{
                zIndex,
                opacity,
                transform: top === 'top-1/2' ? 'translateY(-50%)' : undefined
            }}
        >
            <svg
                className={`${height} ${width} ${borderClasses} ${lineColor}`}
            >
                <defs>
                    <pattern
                        id={patternId}
                        patternUnits="userSpaceOnUse"
                        width="64"
                        height="64"
                    >
                        {generateLinePaths()}
                    </pattern>
                </defs>
                <rect
                    stroke="none"
                    width="100%"
                    height="100%"
                    fill={`url(#${patternId})`}
                />
            </svg>
        </div>
    );
};

export default Block;
