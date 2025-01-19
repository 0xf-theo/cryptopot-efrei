<?php

namespace App\Entity;

use App\Repository\DonationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DonationRepository::class)]
class Donation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $id_pot = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $deposit_date = null;

    #[ORM\Column(length: 50)]
    private ?string $crypto_type = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2)]
    private ?string $amount = null;

    #[ORM\Column]
    private ?string $code = null;

    #[ORM\Column]
    private ?string $public_address = null;

    #[ORM\Column]
    private ?string $transaction_id = null;

     #[ORM\Column]
    private ?string $message = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getId_pot(): ?int
    {
        return $this->id_pot;
    }

    public function setId_pot(int $id_pot): self
    {
        $this->id_pot = $id_pot;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getDeposit_date(): ?\DateTimeInterface
    {
        return $this->deposit_date;
    }

    public function setDeposit_date(\DateTimeInterface $deposit_date): self
    {
        $this->deposit_date = $deposit_date;

        return $this;
    }

    public function getCrypto_type(): ?string
    {
        return $this->crypto_type;
    }

    public function setCrypto_type(string $crypto_type): self
    {
        $this->crypto_type = $crypto_type;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getPublic_address(): ?string
    {
        return $this->public_address;
    }

    public function setPublic_address(string $public_address): self
    {
        $this->public_address = $public_address;

        return $this;
    }

     public function getTransaction_id(): ?string
    {
        return $this->transaction_id;
    }

    public function setTransaction_id(string $transaction_id): self
    {
        $this->transaction_id = $transaction_id;

        return $this;
    }

    public function getAmount(): ?string
    {
        return $this->amount;
    }

    public function setAmount(string $amount): self
    {
        $this->amount = $amount;

        return $this;
    }
}
