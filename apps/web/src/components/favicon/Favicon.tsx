import { styled } from '@pigment-css/react';
import type React from 'react';

type FaviconProps = {
  width: number;
  height: number;
};

export const Favicon: React.FC<FaviconProps> = ({ width, height }) => {
  return (
    <FaviconContainer
      width={width}
      height={height}
      viewBox="0 0 246 246"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="123" cy="123" r="123" />
      <path d="M73.944 93.344V101.984V102.632V187.304C73.944 188.024 74.088 188.576 74.376 188.96C74.664 189.392 75.096 189.68 75.672 189.824L79.344 190.472C79.632 190.52 79.824 190.592 79.92 190.688C80.064 190.832 80.136 190.976 80.136 191.12C80.136 191.264 80.064 191.384 79.92 191.48C79.824 191.576 79.68 191.624 79.488 191.624H47.304C47.16 191.624 47.016 191.576 46.872 191.48C46.776 191.384 46.728 191.264 46.728 191.12C46.728 190.976 46.776 190.832 46.872 190.688C47.016 190.592 47.256 190.52 47.592 190.472L50.616 189.824C51.288 189.68 51.744 189.392 51.984 188.96C52.224 188.576 52.344 188.048 52.344 187.376V101.624C52.344 101.288 52.248 101.024 52.056 100.832C51.912 100.64 51.648 100.544 51.264 100.544H47.52C47.232 100.544 47.016 100.496 46.872 100.4C46.776 100.304 46.728 100.16 46.728 99.968C46.728 99.776 46.8 99.656 46.944 99.608C47.088 99.512 47.256 99.44 47.448 99.392L71.352 92.696C71.88 92.6 72.24 92.528 72.432 92.48C72.624 92.432 72.84 92.408 73.08 92.408C73.368 92.408 73.584 92.504 73.728 92.696C73.872 92.84 73.944 93.056 73.944 93.344ZM72.576 105.296L71.64 104.216C74.568 100.328 77.688 97.448 81 95.576C84.312 93.656 88.104 92.696 92.376 92.696C97.752 92.696 102.456 93.944 106.488 96.44C110.52 98.936 113.64 102.536 115.848 107.24C118.104 111.896 119.232 117.488 119.232 124.016C119.232 131.216 117.912 137.48 115.272 142.808C112.632 148.136 109.008 152.24 104.4 155.12C99.84 158 94.632 159.44 88.776 159.44C84.216 159.44 80.568 158.696 77.832 157.208C75.096 155.672 72.864 153.248 71.136 149.936L72.72 149.216C73.776 151.664 75.168 153.512 76.896 154.76C78.624 155.96 80.664 156.56 83.016 156.56C85.752 156.56 88.2 155.672 90.36 153.896C92.52 152.12 94.2 149.024 95.4 144.608C96.6 140.144 97.2 133.976 97.2 126.104C97.2 118.952 96.672 113.264 95.616 109.04C94.608 104.768 93.192 101.696 91.368 99.824C89.544 97.904 87.432 96.944 85.032 96.944C82.968 96.944 80.856 97.616 78.696 98.96C76.536 100.304 74.496 102.416 72.576 105.296ZM124.799 158C124.655 158 124.511 157.952 124.367 157.856C124.271 157.76 124.223 157.64 124.223 157.496C124.223 157.352 124.271 157.232 124.367 157.136C124.511 156.992 124.751 156.896 125.087 156.848L128.399 156.2C129.071 156.056 129.527 155.792 129.767 155.408C130.007 154.976 130.127 154.424 130.127 153.752V59.36C130.127 59.024 130.031 58.784 129.839 58.64C129.695 58.448 129.431 58.352 129.047 58.352H125.303C125.015 58.352 124.799 58.304 124.655 58.208C124.559 58.064 124.511 57.92 124.511 57.776C124.511 57.584 124.583 57.464 124.727 57.416C124.871 57.32 125.039 57.248 125.231 57.2L149.135 50.504C149.663 50.36 150.023 50.288 150.215 50.288C150.407 50.24 150.623 50.216 150.863 50.216C151.151 50.216 151.367 50.312 151.511 50.504C151.655 50.648 151.727 50.864 151.727 51.152V153.68C151.727 154.4 151.871 154.976 152.159 155.408C152.447 155.792 152.879 156.056 153.455 156.2L156.839 156.848C157.367 156.992 157.631 157.208 157.631 157.496C157.631 157.832 157.415 158 156.983 158H124.799ZM148.559 133.736L175.631 106.592C177.983 104.24 178.799 102.032 178.079 99.968C177.359 97.904 175.463 96.536 172.391 95.864L169.655 95.288C169.319 95.192 169.103 95.096 169.007 95C168.911 94.904 168.863 94.808 168.863 94.712C168.863 94.472 168.911 94.328 169.007 94.28C169.151 94.184 169.319 94.136 169.511 94.136H198.094C198.383 94.136 198.575 94.184 198.671 94.28C198.767 94.328 198.815 94.472 198.815 94.712C198.815 94.856 198.743 94.976 198.599 95.072C198.503 95.12 198.287 95.192 197.951 95.288C193.967 96.2 190.247 97.616 186.791 99.536C183.335 101.456 180.071 103.952 176.999 107.024L149.495 134.816L148.559 133.736ZM171.743 111.272L196.007 153.536C196.583 154.496 197.159 155.216 197.734 155.696C198.359 156.128 199.127 156.512 200.039 156.848C200.423 157.04 200.663 157.184 200.759 157.28C200.855 157.376 200.903 157.472 200.903 157.568C200.903 157.712 200.831 157.832 200.687 157.928C200.591 157.976 200.447 158 200.255 158H165.047C164.855 158 164.687 157.952 164.543 157.856C164.447 157.76 164.398 157.64 164.398 157.496C164.398 157.352 164.447 157.232 164.543 157.136C164.687 156.992 164.903 156.896 165.191 156.848L168.143 156.272C169.247 156.08 169.943 155.744 170.231 155.264C170.519 154.736 170.423 154.04 169.943 153.176L156.191 127.256L171.743 111.272Z" />
    </FaviconContainer>
  );
};

const FaviconContainer = styled.svg`
  & circle {
    fill: var(--color-fg);
  }

  & path {
    fill: var(--color-bg);
  }

  &:hover {
    circle {
      fill: var(--color-fg-interactive);
    }
  }
`;
